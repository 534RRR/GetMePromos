import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const couponId = params.id;

    // 1. Fetch coupon with associated store
    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
      include: {
        store: true,
      },
    });

    if (!coupon || !coupon.store) {
      return NextResponse.redirect(new URL('/', request.url), 302);
    }

    // 2. Extract metadata for analytics
    const forwardedFor = request.headers.get('x-forwarded-for');
    const rawIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(rawIp + (process.env.IP_SALT || 'gd-salt-2026')).digest('hex').substring(0, 32);

    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || '';
    const countryHeader = request.headers.get('cf-ipcountry') || request.headers.get('x-country-code') || 'US';

    const searchParams = request.nextUrl.searchParams;
    const subId = searchParams.get('subid') || searchParams.get('subId') || null;

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

    // 4. Resolve destination URL (Coupon override -> Store affiliate -> Store merchant)
    let targetUrl = coupon.affiliateUrlOverride || coupon.store.affiliateUrl || coupon.store.merchantUrl;

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    // Append subid or tracking params if available
    try {
      const parsedTarget = new URL(targetUrl);
      if (subId) {
        parsedTarget.searchParams.set('subid', subId);
      }
      targetUrl = parsedTarget.toString();
    } catch {
      // Keep targetUrl as is if parsing fails
    }

    return NextResponse.redirect(targetUrl, 307);
  } catch (error) {
    console.error('Error in /out/coupon/[id]:', error);
    return NextResponse.redirect(new URL('/', request.url), 302);
  }
}
