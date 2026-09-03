import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { createErrorResponse } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const review = await prisma.review.findUnique({
        where: { id },
        include: {
          store: {
            select: { id: true, name: true, slug: true, logoUrl: true },
          },
        },
      });
      return NextResponse.json({ review });
    }

    const reviews = await prisma.review.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        store: {
          select: { id: true, name: true, slug: true, logoUrl: true },
        },
      },
    });

    return NextResponse.json({ reviews });
  } catch (error: any) {
    return createErrorResponse('Failed to fetch reviews', error, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      storeId,
      title,
      slug,
      rating,
      summary,
      pros,
      cons,
      verdict,
      detailedContent,
      authorName,
      status,
      seoTitle,
      metaDescription,
    } = await req.json();

    if (!storeId || !title || !detailedContent) {
      return NextResponse.json({ error: 'Store, Title, and Review Content are required' }, { status: 400 });
    }

    // Check if review already exists for this store
    const existing = await prisma.review.findUnique({ where: { storeId } });
    if (existing) {
      return NextResponse.json({ error: 'A review already exists for this store. Please edit the existing one.' }, { status: 400 });
    }

    const finalSlug = (slug || title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const prosJson = Array.isArray(pros) ? JSON.stringify(pros.filter(Boolean)) : (typeof pros === 'string' ? pros : '[]');
    const consJson = Array.isArray(cons) ? JSON.stringify(cons.filter(Boolean)) : (typeof cons === 'string' ? cons : '[]');

    const review = await prisma.review.create({
      data: {
        storeId,
        title: title.trim(),
        slug: finalSlug,
        rating: rating ? parseFloat(rating) : 4.5,
        summary: summary || null,
        prosJson,
        consJson,
        verdict: verdict || null,
        detailedContent: detailedContent.trim(),
        authorName: authorName || 'Deal Experts Team',
        status: status || 'published',
        seoTitle: seoTitle || null,
        metaDescription: metaDescription || null,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    return createErrorResponse('Failed to create review', error, 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      id,
      storeId,
      title,
      slug,
      rating,
      summary,
      pros,
      cons,
      verdict,
      detailedContent,
      authorName,
      status,
      seoTitle,
      metaDescription,
    } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    const finalSlug = slug
      ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : undefined;

    const prosJson = Array.isArray(pros) ? JSON.stringify(pros.filter(Boolean)) : (typeof pros === 'string' ? pros : undefined);
    const consJson = Array.isArray(cons) ? JSON.stringify(cons.filter(Boolean)) : (typeof cons === 'string' ? cons : undefined);

    const review = await prisma.review.update({
      where: { id },
      data: {
        storeId: storeId || undefined,
        title: title ? title.trim() : undefined,
        slug: finalSlug,
        rating: rating !== undefined ? parseFloat(rating) : undefined,
        summary: summary !== undefined ? summary : undefined,
        prosJson,
        consJson,
        verdict: verdict !== undefined ? verdict : undefined,
        detailedContent: detailedContent ? detailedContent.trim() : undefined,
        authorName: authorName || undefined,
        status: status || undefined,
        seoTitle: seoTitle !== undefined ? seoTitle : undefined,
        metaDescription: metaDescription !== undefined ? metaDescription : undefined,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    return createErrorResponse('Failed to update review', error, 500);
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
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return createErrorResponse('Failed to delete review', error, 500);
  }
}
