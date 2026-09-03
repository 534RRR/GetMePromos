import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

function getJwtSecretKey(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[SECURITY FATAL] JWT_SECRET environment variable is missing or shorter than 32 characters in production!');
      return null;
    }
    return new TextEncoder().encode('development-only-temporary-jwt-secret-key-change-me-32-chars-minimum!');
  }
  return new TextEncoder().encode(secret);
}

const COOKIE_NAME = 'admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. CORS & Origin Validation: Restrict mutating requests to legitimate frontend origin
  if (pathname.startsWith('/api/')) {
    const method = request.method.toUpperCase();
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const origin = request.headers.get('origin');
      if (origin) {
        const allowedOrigins = [
          request.nextUrl.origin,
          process.env.NEXT_PUBLIC_SITE_URL,
          'http://localhost:3000',
        ].filter(Boolean);

        const isAllowed = allowedOrigins.some((allowed) => {
          try {
            return new URL(origin).origin === new URL(allowed as string).origin;
          } catch {
            return false;
          }
        });

        if (!isAllowed) {
          return new NextResponse(
            JSON.stringify({ error: 'Forbidden: Cross-origin request rejected.' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }
  }

  // 2. Protect /admin CMS dashboard routes and /api/admin backend endpoints
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isPublicAuthRoute = pathname === '/admin/login' || pathname === '/api/admin/auth/login';

  if (isAdminRoute) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    let isValid = false;
    let role: string | undefined = undefined;

    if (token) {
      const secretKey = getJwtSecretKey();
      if (secretKey) {
        try {
          const { payload } = await jwtVerify(token, secretKey);
          isValid = true;
          role = payload.role as string;
        } catch (e) {
          isValid = false;
        }
      }
    }

    if (isPublicAuthRoute) {
      // If already logged in and visiting login UI, redirect away to dashboard
      if (isValid && pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // For all other admin routes, require valid token
    if (!isValid) {
      if (pathname.startsWith('/api/')) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized: Authentication required.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Only Super Admin can access user management (/admin/users or /api/admin/users)
    const isUserManagement = pathname.startsWith('/admin/users') || pathname.startsWith('/api/admin/users');
    if (isUserManagement && role !== 'super_admin') {
      if (pathname.startsWith('/api/')) {
        return new NextResponse(
          JSON.stringify({ error: 'Forbidden: Super Administrator privileges required.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
