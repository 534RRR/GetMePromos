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
      const blog = await prisma.blog.findUnique({
        where: { id },
        include: {
          category: true,
          blogStores: { select: { storeId: true } },
          blogCoupons: { select: { couponId: true } },
        },
      });
      return NextResponse.json({ blog });
    }

    const blogs = await prisma.blog.findMany({
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        blogStores: {
          include: {
            store: { select: { id: true, name: true, logoUrl: true } },
          },
        },
        _count: {
          select: { blogStores: true, blogCoupons: true },
        },
      },
    });

    return NextResponse.json({ blogs });
  } catch (error: any) {
    return createErrorResponse('Failed to fetch blogs', error, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      categoryId,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      authorName,
      readingTime,
      status,
      publishedAt,
      seoTitle,
      metaDescription,
      ogImage,
      storeIds,
      couponIds,
    } = await req.json();

    if (!title || !categoryId || !content) {
      return NextResponse.json({ error: 'Title, Category, and Content are required' }, { status: 400 });
    }

    const finalSlug = (slug || title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const blog = await prisma.blog.create({
      data: {
        categoryId,
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt || null,
        content: content.trim(),
        featuredImage: featuredImage || null,
        authorName: authorName || 'GrabYourDealz Editorial',
        readingTime: readingTime || '5 min read',
        status: status || 'published',
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        seoTitle: seoTitle || null,
        metaDescription: metaDescription || null,
        ogImage: ogImage || featuredImage || null,
      },
    });

    // Link Stores
    if (Array.isArray(storeIds)) {
      for (const storeId of storeIds) {
        await prisma.blogStore.create({
          data: { blogId: blog.id, storeId },
        });
      }
    }

    // Link Coupons
    if (Array.isArray(couponIds)) {
      for (const couponId of couponIds) {
        await prisma.blogCoupon.create({
          data: { blogId: blog.id, couponId },
        });
      }
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    return createErrorResponse('Failed to create blog post', error, 500);
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
      categoryId,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      authorName,
      readingTime,
      status,
      publishedAt,
      seoTitle,
      metaDescription,
      ogImage,
      storeIds,
      couponIds,
    } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const finalSlug = slug
      ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : undefined;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        categoryId: categoryId || undefined,
        title: title ? title.trim() : undefined,
        slug: finalSlug,
        excerpt: excerpt !== undefined ? excerpt : undefined,
        content: content ? content.trim() : undefined,
        featuredImage: featuredImage !== undefined ? featuredImage : undefined,
        authorName: authorName || undefined,
        readingTime: readingTime || undefined,
        status: status || undefined,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        seoTitle: seoTitle !== undefined ? seoTitle : undefined,
        metaDescription: metaDescription !== undefined ? metaDescription : undefined,
        ogImage: ogImage !== undefined ? ogImage : undefined,
      },
    });

    // Update Store Links
    if (Array.isArray(storeIds)) {
      await prisma.blogStore.deleteMany({ where: { blogId: id } });
      for (const storeId of storeIds) {
        await prisma.blogStore.create({
          data: { blogId: id, storeId },
        });
      }
    }

    // Update Coupon Links
    if (Array.isArray(couponIds)) {
      await prisma.blogCoupon.deleteMany({ where: { blogId: id } });
      for (const couponId of couponIds) {
        await prisma.blogCoupon.create({
          data: { blogId: id, couponId },
        });
      }
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    return createErrorResponse('Failed to update blog post', error, 500);
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
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return createErrorResponse('Failed to delete blog post', error, 500);
  }
}
