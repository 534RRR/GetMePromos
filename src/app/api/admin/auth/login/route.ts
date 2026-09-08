import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createSessionToken, setSessionCookie } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { createErrorResponse } from '@/lib/apiResponse';

export async function POST(req: NextRequest) {
  try {
    // Rate Limiting: 5 attempts per minute per IP
    const rateLimit = checkRateLimit(req, 5, 60, 'login');
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Too many login attempts. Please wait ${rateLimit.reset} seconds before trying again.` },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // Auto-bootstrap Super Admin if database has no users
    if (!user && email.toLowerCase().trim() === 'anasshahid6614@gmail.com') {
      try {
        const userCount = await prisma.user.count();
        if (userCount === 0) {
          const passwordHash = await bcrypt.hash('19991214Gamer#', 10);
          user = await prisma.user.create({
            data: {
              email: 'anasshahid6614@gmail.com',
              passwordHash,
              name: 'Super Admin',
              role: 'super_admin',
              isActive: true,
            },
          });
        }
      } catch (seedErr) {
        console.warn('Auto-bootstrap admin check encountered error:', seedErr);
      }
    }

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Set cookie on response object
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Also call setSessionCookie for server state consistency
    try {
      await setSessionCookie(token);
    } catch {
      // Ignored if cookieStore is already committed
    }

    return response;
  } catch (error: any) {
    console.error('[AUTH LOGIN ERROR]', error);
    return NextResponse.json(
      { error: error?.message || 'Authentication service temporarily unavailable.' },
      { status: 500 }
    );
  }
}
