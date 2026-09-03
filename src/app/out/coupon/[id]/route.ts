import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Prevent automated click flooding and analytics poisoning (60 redirects/min per IP)
    const rateLimit = checkRateLimit(request, 60, 60, 'coupon-out');
    if (!rateLimit.success) {
      return NextResponse.redirect(new URL('/', request.url), 302);
    }

    const couponId = params.id;

    // 1. Fetch coupon with associated store and verify both are active
    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
      include: {
        store: true,
      },
    });

    if (!coupon || !coupon.store || coupon.status !== 'active' || coupon.store.status !== 'active') {
      return NextResponse.redirect(new URL('/', request.url), 302);
    }

    // 2. Extract metadata for analytics
    const forwardedFor = request.headers.get('x-forwarded-for');
    const rawIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const ipHash = crypto
      .createHash('sha256')
      .update(rawIp + (process.env.IP_SALT || ''))
      .digest('hex')
      .substring(0, 32);

    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || '';
    const countryHeader = request.headers.get('cf-ipcountry') || request.headers.get('x-country-code') || 'US';

    const searchParams = request.nextUrl.searchParams;
    const rawSubId = searchParams.get('subid') || searchParams.get('subId') || '';
    const subId = rawSubId ? rawSubId.replace(/[^a-zA-Z0-9_\-]/g, '').substring(0, 64) : null;

    // 3. Log click asynchronously and increment coupon use count
    await Promise.allSettled([
      prisma.clickLog.create({
        data: {
          couponId: coupon.id,
          storeId: coupon.store.id,
          countryCode: countryHeader,
          subId: subId,
          ipHash: ipHash,
          userAgent: userAgent.substring(0, 250),
          referer: referer.substring(0, 250),
        },
      }),
      prisma.coupon.update({
        where: { id: coupon.id },
        data: {
          usedCount: { increment: 1 },
        },
      }),
    ]);

    // 4. Resolve and validate destination URL (Coupon override -> Store affiliate -> Store merchant)
    let rawTarget = (coupon.affiliateUrlOverride || coupon.store.affiliateUrl || coupon.store.merchantUrl || '').trim();
    if (!rawTarget.startsWith('http://') && !rawTarget.startsWith('https://')) {
      rawTarget = `https://${rawTarget}`;
    }

    let parsedTarget: URL;
    try {
      parsedTarget = new URL(rawTarget);
      if (parsedTarget.protocol !== 'http:' && parsedTarget.protocol !== 'https:') {
        return NextResponse.redirect(new URL('/', request.url), 302);
      }
      if (subId) {
        parsedTarget.searchParams.set('subid', subId);
      }
    } catch {
      return NextResponse.redirect(new URL('/', request.url), 302);
    }

    return NextResponse.redirect(parsedTarget.toString(), 307);
  } catch (error) {
    console.error('Error in /out/coupon/[id]:', error);
    return NextResponse.redirect(new URL('/', request.url), 302);
  }
}
