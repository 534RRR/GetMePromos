import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const storeId = params.id;

    // 1. Fetch store
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return NextResponse.redirect(new URL('/stores', request.url), 302);
    }

    // 2. Extract analytics metadata
    const forwardedFor = request.headers.get('x-forwarded-for');
    const rawIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(rawIp + (process.env.IP_SALT || 'gd-salt-2026')).digest('hex').substring(0, 32);

    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || '';
    const countryHeader = request.headers.get('cf-ipcountry') || request.headers.get('x-country-code') || 'US';

    const searchParams = request.nextUrl.searchParams;
    const subId = searchParams.get('subid') || searchParams.get('subId') || null;

    // 3. Log click in clickLog table
    await prisma.clickLog.create({
      data: {
        storeId: store.id,
        countryCode: countryHeader,
        subId: subId,
        ipHash: ipHash,
        userAgent: userAgent.substring(0, 250),
        referer: referer.substring(0, 250),
      },
    });

    // 4. Resolve destination URL
    let targetUrl = store.affiliateUrl || store.merchantUrl;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    try {
      const parsedTarget = new URL(targetUrl);
      if (subId) {
        parsedTarget.searchParams.set('subid', subId);
      }
      targetUrl = parsedTarget.toString();
    } catch {
      // Keep targetUrl as is
    }

    return NextResponse.redirect(targetUrl, 307);
  } catch (error) {
    console.error('Error in /out/store/[id]:', error);
    return NextResponse.redirect(new URL('/stores', request.url), 302);
  }
}
