import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { createErrorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { blogs: true } },
      },
    });
    return NextResponse.json({ categories });
  } catch (error: any) {
    return createErrorResponse('Failed to fetch categories', error, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, slug, description, seoTitle, metaDescription } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const finalSlug = (slug || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = await prisma.blogCategory.create({
      data: {
        name: name.trim(),
        slug: finalSlug,
        description,
        seoTitle,
        metaDescription,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return createErrorResponse('Failed to create category', error, 500);
  }
}
