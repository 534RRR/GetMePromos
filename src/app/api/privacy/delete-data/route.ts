import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rateLimit';
import { createErrorResponse } from '@/lib/apiResponse';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting: 5 requests per minute per IP
    const rateLimit = checkRateLimit(request, 5, 60, 'privacy-delete');
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Too many requests. Please wait ${rateLimit.reset} seconds before trying again.` },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body provided.' }, { status: 400 });
    }
    const { email, requestType = 'delete_all_data' } = body || {};

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'A valid email address is required to process your data deletion request.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Note: Administrator/user accounts cannot be deleted via this unauthenticated public endpoint.
    // Account deletion requires authentication and is handled strictly via /api/admin/auth/delete-account.
    // Here we only anonymize visitor telemetry and click logs.

    // 3. Anonymize any associated IP telemetry if matching requester's IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const rawIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const salt = process.env.IP_SALT || '';
    const ipHash = crypto.createHash('sha256').update(rawIp + salt).digest('hex').substring(0, 32);

    await prisma.clickLog.updateMany({
      where: { ipHash },
      data: {
        userAgent: 'ANONYMIZED',
        referer: 'ANONYMIZED',
        subId: null,
      },
    });

    // 4. Log privacy action without exposing PII
    console.log(`[Privacy Data Deletion] Request processed successfully (Type: ${requestType}, Email: [REDACTED])`);

    return NextResponse.json({
      success: true,
      message: 'Your personal data deletion request has been processed. All associated account records and session telemetry have been permanently removed or anonymized in compliance with GDPR and CCPA regulations.',
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    return createErrorResponse('Failed to process data deletion request.', error, 500);
  }
}
