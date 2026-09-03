import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession, clearSessionCookie } from '@/lib/auth';
import { createErrorResponse } from '@/lib/apiResponse';

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Super Admin safeguard
    if (session.role === 'super_admin') {
      const superAdminCount = await prisma.user.count({
        where: { role: 'super_admin' },
      });

      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: 'The sole Super Administrator account cannot be deleted. Promote another administrator to Super Admin first.' },
          { status: 400 }
        );
      }
    }

    // Permanently remove the user account
    await prisma.user.delete({
      where: { id: session.id },
    });

    // Invalidate session cookie immediately
    clearSessionCookie();

    console.log('[Admin Account Deletion] Account and personal data permanently erased (User: [REDACTED])');

    return NextResponse.json({
      success: true,
      message: 'Your administrator account and personal data have been permanently deleted.',
    });
  } catch (error) {
    return createErrorResponse('Failed to delete account.', error, 500);
  }
}
