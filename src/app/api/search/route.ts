import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.trim() || '';

    if (!query || query.length < 2) {
      return NextResponse.json({
        stores: [],
        coupons: [],
        categories: [],
        blogs: [],
      });
    }

    const [stores, coupons, categories, blogs] = await Promise.all([
      // 1. Search Stores
      prisma.store.findMany({
        where: {
          status: 'active',
          OR: [
            { name: { contains: query } },
            { slug: { contains: query } },
          ],
        },
        take: 5,
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
          ratingScore: true,
          _count: {
            select: { coupons: true, deals: true },
          },
        },
      }),

      // 2. Search Coupons
      prisma.coupon.findMany({
        where: {
          status: 'active',
          OR: [
            { title: { contains: query } },
            { couponCode: { contains: query } },
            { discountValue: { contains: query } },
          ],
        },
        take: 5,
        select: {
          id: true,
          title: true,
          discountValue: true,
          couponCode: true,
          store: {
            select: {
              name: true,
              slug: true,
              logoUrl: true,
            },
          },
        },
      }),

      // 3. Search Categories
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { slug: { contains: query } },
          ],
        },
        take: 4,
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
        },
      }),

      // 4. Search Blogs
      prisma.blog.findMany({
        where: {
          status: 'published',
          OR: [
            { title: { contains: query } },
            { slug: { contains: query } },
            { excerpt: { contains: query } },
          ],
        },
        take: 3,
        select: {
          id: true,
          title: true,
          slug: true,
          readingTime: true,
          featuredImage: true,
        },
      }),
    ]);

    return NextResponse.json({
      stores,
      coupons,
      categories,
      blogs,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
