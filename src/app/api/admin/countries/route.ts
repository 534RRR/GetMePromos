import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const countries = await prisma.country.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json({ countries });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code, name, currencySymbol, currencyCode, flagIcon, isActive, sortOrder } = await req.json();

    if (!code || !name) {
      return NextResponse.json({ error: 'Country code and name are required' }, { status: 400 });
    }

    const country = await prisma.country.create({
      data: {
        code: code.toUpperCase().trim(),
        name: name.trim(),
        currencySymbol: currencySymbol || '$',
        currencyCode: currencyCode || 'USD',
        flagIcon: flagIcon || '🌍',
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      },
    });

    return NextResponse.json({ success: true, country });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create country' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, code, name, currencySymbol, currencyCode, flagIcon, isActive, sortOrder } = await req.json();

    const country = await prisma.country.update({
      where: { id },
      data: {
        code: code ? code.toUpperCase().trim() : undefined,
        name: name ? name.trim() : undefined,
        currencySymbol,
        currencyCode,
        flagIcon,
        isActive,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : undefined,
      },
    });

    return NextResponse.json({ success: true, country });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update country' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Country ID is required' }, { status: 400 });
    }

    await prisma.country.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete country' }, { status: 500 });
  }
}
