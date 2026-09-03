import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { createErrorResponse } from '@/lib/apiResponse';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: { select: { storeCategories: true } },
    },
  });
  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, slug, icon, description, isFeatured, sortOrder, seoTitle, metaDescription } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: slug.toLowerCase().trim().replace(/\s+/g, '-'),
        icon: icon || 'Tag',
        description,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
        seoTitle,
        metaDescription,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return createErrorResponse('Failed to create category', error, 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, slug, icon, description, isFeatured, sortOrder, seoTitle, metaDescription } = await req.json();

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name ? name.trim() : undefined,
        slug: slug ? slug.toLowerCase().trim().replace(/\s+/g, '-') : undefined,
        icon,
        description,
        isFeatured,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : undefined,
        seoTitle,
        metaDescription,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return createErrorResponse('Failed to update category', error, 500);
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
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return createErrorResponse('Failed to delete category', error, 500);
  }
}
