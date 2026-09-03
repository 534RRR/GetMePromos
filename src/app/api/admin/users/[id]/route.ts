import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { createErrorResponse } from '@/lib/apiResponse';

interface Params {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'super_admin') {
      return NextResponse.json({ error: 'Only Super Administrator can delete admin accounts' }, { status: 403 });
    }

    const { id } = params;

    // Security check: cannot delete oneself
    if (session.id === id) {
      return NextResponse.json(
        { error: 'You cannot delete your own currently active Super Admin account' },
        { status: 400 }
      );
    }

    const userToDelete = await prisma.user.findUnique({ where: { id } });
    if (!userToDelete) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (userToDelete.role === 'super_admin') {
      return NextResponse.json(
        { error: 'The Super Administrator account cannot be deleted' },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Admin account deleted successfully' });
  } catch (error: any) {
    return createErrorResponse('Failed to delete user', error, 500);
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'super_admin') {
      return NextResponse.json({ error: 'Only Super Administrator can modify admin accounts' }, { status: 403 });
    }

    const { id } = params;
    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const updateData: any = {};

    if (body.name) updateData.name = body.name.trim();
    if (typeof body.isActive === 'boolean') {
      // Super Admin cannot be deactivated
      if (targetUser.role === 'super_admin' && !body.isActive) {
        return NextResponse.json({ error: 'The Super Administrator account cannot be deactivated' }, { status: 400 });
      }
      updateData.isActive = body.isActive;
    }
    if (body.password && body.password.length >= 6) {
      updateData.passwordHash = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return createErrorResponse('Failed to update user', error, 500);
  }
}
