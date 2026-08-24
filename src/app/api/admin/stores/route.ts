import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        storeCountries: { select: { countryId: true } },
        storeCategories: { select: { categoryId: true } },
        faqs: true,
      },
    });
    return NextResponse.json({ store });
  }

  const stores = await prisma.store.findMany({
    orderBy: { name: 'asc' },
    include: {
      storeCountries: { include: { country: true } },
      storeCategories: { include: { category: true } },
      _count: { select: { coupons: true, deals: true } },
    },
  });

  return NextResponse.json({ stores });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      name,
      slug,
      logoUrl,
      bannerUrl,
      shortDescription,
      longDescription,
      merchantUrl,
      affiliateUrl,
      ratingScore,
      isFeatured,
      isPopular,
      status,
      seoTitle,
      metaDescription,
      countryIds,
      categoryIds,
      faqs,
    } = await req.json();

    if (!name || !slug || !logoUrl || !merchantUrl || !affiliateUrl) {
      return NextResponse.json({ error: 'Missing required store fields' }, { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name: name.trim(),
        slug: slug.toLowerCase().trim().replace(/\s+/g, '-'),
        logoUrl: logoUrl.trim(),
        bannerUrl: bannerUrl ? bannerUrl.trim() : null,
        shortDescription,
        longDescription,
        merchantUrl: merchantUrl.trim(),
        affiliateUrl: affiliateUrl.trim(),
        ratingScore: ratingScore ? parseFloat(ratingScore) : 4.8,
        isFeatured: Boolean(isFeatured),
        isPopular: Boolean(isPopular),
        status: status || 'active',
        seoTitle,
        metaDescription,
      },
    });

    // Link Countries
    if (Array.isArray(countryIds)) {
      for (const cId of countryIds) {
        await prisma.storeCountry.create({
          data: { storeId: store.id, countryId: cId },
        });
      }
    }

    // Link Categories
    if (Array.isArray(categoryIds)) {
      for (const catId of categoryIds) {
        await prisma.storeCategory.create({
          data: { storeId: store.id, categoryId: catId },
        });
      }
    }

    // Add FAQs
    if (Array.isArray(faqs)) {
      for (const f of faqs) {
        if (f.question && f.answer) {
          await prisma.fAQ.create({
            data: {
              storeId: store.id,
              question: f.question,
              answer: f.answer,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, store });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create store' }, { status: 500 });
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
      name,
      slug,
      logoUrl,
      bannerUrl,
      shortDescription,
      longDescription,
      merchantUrl,
      affiliateUrl,
      ratingScore,
      isFeatured,
      isPopular,
      status,
      seoTitle,
      metaDescription,
      countryIds,
      categoryIds,
    } = await req.json();

    const store = await prisma.store.update({
      where: { id },
      data: {
        name: name ? name.trim() : undefined,
        slug: slug ? slug.toLowerCase().trim().replace(/\s+/g, '-') : undefined,
        logoUrl: logoUrl ? logoUrl.trim() : undefined,
        bannerUrl,
        shortDescription,
        longDescription,
        merchantUrl: merchantUrl ? merchantUrl.trim() : undefined,
        affiliateUrl: affiliateUrl ? affiliateUrl.trim() : undefined,
        ratingScore: ratingScore !== undefined ? parseFloat(ratingScore) : undefined,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
        isPopular: isPopular !== undefined ? Boolean(isPopular) : undefined,
        status: status !== undefined ? status : undefined,
        seoTitle,
        metaDescription,
      },
    });

    // Update Country Links
    if (Array.isArray(countryIds)) {
      await prisma.storeCountry.deleteMany({ where: { storeId: id } });
      for (const cId of countryIds) {
        await prisma.storeCountry.create({
          data: { storeId: id, countryId: cId },
        });
      }
    }

    // Update Category Links
    if (Array.isArray(categoryIds)) {
      await prisma.storeCategory.deleteMany({ where: { storeId: id } });
      for (const catId of categoryIds) {
        await prisma.storeCategory.create({
          data: { storeId: id, categoryId: catId },
        });
      }
    }

    return NextResponse.json({ success: true, store });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update store' }, { status: 500 });
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
      return NextResponse.json({ error: 'Store ID is required' }, { status: 400 });
    }

    await prisma.store.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete store' }, { status: 500 });
  }
}
