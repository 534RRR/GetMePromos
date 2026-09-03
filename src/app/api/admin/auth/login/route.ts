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

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

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

    setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    return createErrorResponse('Authentication service temporarily unavailable.', error, 500);
  }
}
