import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { createErrorResponse } from '@/lib/apiResponse';

function isValidHttpUrl(str?: string | null): boolean {
  if (!str) return true;
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const coupon = await prisma.coupon.findUnique({
      where: { id },
      include: {
        store: true,
        couponCountries: { select: { countryId: true } },
      },
    });
    return NextResponse.json({ coupon });
  }

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      store: { select: { id: true, name: true, logoUrl: true } },
      couponCountries: { include: { country: true } },
    },
  });

  return NextResponse.json({ coupons });
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
      description,
      couponCode,
      discountValue,
      discountType,
      couponType,
      ctaText,
      affiliateUrlOverride,
      startDate,
      expiryDate,
      isVerified,
      isFeatured,
      status,
      termsConditions,
      countryIds,
    } = await req.json();

    if (!storeId || !title || !discountValue) {
      return NextResponse.json({ error: 'Store, title, and discount value are required' }, { status: 400 });
    }

    if (!isValidHttpUrl(affiliateUrlOverride)) {
      return NextResponse.json({ error: 'Affiliate URL override must be a valid HTTP/HTTPS URL' }, { status: 400 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        storeId,
        title: title.trim(),
        description,
        couponCode: couponCode ? couponCode.trim().toUpperCase() : null,
        discountValue: discountValue.trim(),
        discountType: discountType || 'percentage',
        couponType: couponType || 'coupon_code',
        ctaText: ctaText || (couponCode ? 'Get Code' : 'Get Deal'),
        affiliateUrlOverride: affiliateUrlOverride ? affiliateUrlOverride.trim() : null,
        startDate: startDate ? new Date(startDate) : new Date(),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        isVerified: isVerified !== undefined ? Boolean(isVerified) : true,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : false,
        status: status || 'active',
        termsConditions,
      },
    });

    if (Array.isArray(countryIds)) {
      for (const cId of countryIds) {
        await prisma.couponCountry.create({
          data: { couponId: coupon.id, countryId: cId },
        });
      }
    }

    return NextResponse.json({ success: true, coupon });
  } catch (error: any) {
    return createErrorResponse('Failed to create coupon', error, 500);
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
      description,
      couponCode,
      discountValue,
      discountType,
      couponType,
      ctaText,
      affiliateUrlOverride,
      startDate,
      expiryDate,
      isVerified,
      isFeatured,
      status,
      termsConditions,
      countryIds,
    } = await req.json();

    if (!isValidHttpUrl(affiliateUrlOverride)) {
      return NextResponse.json({ error: 'Affiliate URL override must be a valid HTTP/HTTPS URL' }, { status: 400 });
    }

    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        storeId: storeId ? storeId : undefined,
        title: title ? title.trim() : undefined,
        description,
        couponCode: couponCode !== undefined ? (couponCode ? couponCode.trim().toUpperCase() : null) : undefined,
        discountValue: discountValue ? discountValue.trim() : undefined,
        discountType,
        couponType,
        ctaText,
        affiliateUrlOverride,
        startDate: startDate ? new Date(startDate) : undefined,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        isVerified: isVerified !== undefined ? Boolean(isVerified) : undefined,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
        status,
        termsConditions,
      },
    });

    if (Array.isArray(countryIds)) {
      await prisma.couponCountry.deleteMany({ where: { couponId: id } });
      for (const cId of countryIds) {
        await prisma.couponCountry.create({
          data: { couponId: id, countryId: cId },
        });
      }
    }

    return NextResponse.json({ success: true, coupon });
  } catch (error: any) {
    return createErrorResponse('Failed to update coupon', error, 500);
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
      return NextResponse.json({ error: 'Coupon ID is required' }, { status: 400 });
    }

    await prisma.coupon.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return createErrorResponse('Failed to delete coupon', error, 500);
  }
}
