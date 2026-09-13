import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

function getJwtSecretKey(): Uint8Array {
  const secret =
    process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32
      ? process.env.JWT_SECRET
      : 'c87e419b846e3921b7145e3174291845f94b8e19284759201948572910394857';
  return new TextEncoder().encode(secret);
}

const COOKIE_NAME = 'admin_session';

const REGION_SLUG_MAP: Record<string, { code: string; lang: string }> = {
  us: { code: 'US', lang: 'en' },
  uk: { code: 'UK', lang: 'en' },
  au: { code: 'AU', lang: 'en' },
  ca: { code: 'CA', lang: 'en' },
  de: { code: 'DE', lang: 'de' },
  fr: { code: 'FR', lang: 'fr' },
  it: { code: 'IT', lang: 'it' },
  nl: { code: 'NL', lang: 'nl' },
};

const CODE_TO_SLUG: Record<string, string> = {
  US: 'us',
  UK: 'uk',
  GB: 'uk',
  AU: 'au',
  CA: 'ca',
  DE: 'de',
  FR: 'fr',
  IT: 'it',
  NL: 'nl',
};

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
          process.env.NEXT_PUBLIC_APP_URL,
          'http://localhost:3000',
        ].filter(Boolean);

        const hostHeader = request.headers.get('host') || request.headers.get('x-forwarded-host');
        if (hostHeader) {
          const protocol = request.headers.get('x-forwarded-proto') || 'https';
          allowedOrigins.push(`${protocol}://${hostHeader}`);
        }

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
      if (isValid && pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

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

    return NextResponse.next();
  }

  // Skip API, admin, and outbound tracking routes from region prefixing
  if (pathname.startsWith('/api') || pathname.startsWith('/admin') || pathname.startsWith('/out')) {
    return NextResponse.next();
  }

  // 3. Multi-Region Slug Routing & Rewriting
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  // Case A: Root path '/' or no region prefix -> serve as-is (no auto-redirect on first visit)
  // The URL slug only changes when the user explicitly selects a region from the dropdown.
  if (pathname === '/' || segments.length === 0) {
    return NextResponse.next();
  }

  // Case B: First segment is a valid region slug (e.g. /us, /uk, /au, /ca, /de, /fr, /it, /nl)
  if (firstSegment && REGION_SLUG_MAP[firstSegment]) {
    const regionInfo = REGION_SLUG_MAP[firstSegment];
    const remainingSegments = segments.slice(1);
    const internalPath = remainingSegments.length > 0 ? `/${remainingSegments.join('/')}` : '/';

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = internalPath;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-country', regionInfo.code);
    requestHeaders.set('x-region-slug', firstSegment);
    requestHeaders.set('x-locale', regionInfo.lang);

    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set('x-country', regionInfo.code);
    response.headers.set('x-region-slug', firstSegment);
    response.headers.set('x-locale', regionInfo.lang);

    // Sync cookie if not already matching
    const currentCookie = request.cookies.get('gmp_country')?.value?.toUpperCase();
    if (currentCookie !== regionInfo.code) {
      response.cookies.set('gmp_country', regionInfo.code, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      });
    }

    return response;
  }

  // Case C: Path doesn't start with a region slug (e.g. /coupons, /stores/nike)
  // Serve as-is — region slug in URL is opt-in only (user must select region from dropdown)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml
     * - static image or font assets with extensions
     */
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
