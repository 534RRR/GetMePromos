import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { createErrorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access restricted to Super Administrator' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    return createErrorResponse('Failed to fetch users', error, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only Super Admin can create new admin accounts
    if (session.role !== 'super_admin') {
      return NextResponse.json({ error: 'Only Super Administrator can create new admin accounts' }, { status: 403 });
    }

    // Rate Limiting on Account Creation
    const rateLimit = checkRateLimit(req, 10, 60, 'admin-user-create');
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Too many account creation requests. Please wait ${rateLimit.reset} seconds.` },
        { status: 429 }
      );
    }

    const { name, email, password, isActive = true } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email address already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        role: 'admin', // Admins have full website management rights, but cannot manage users
        isActive: Boolean(isActive),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return createErrorResponse('Failed to create user', error, 500);
  }
}
