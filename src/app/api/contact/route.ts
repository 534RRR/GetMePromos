import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { createErrorResponse } from '@/lib/apiResponse';

function sanitize(str: string): string {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting: 5 submissions per minute per IP
    const rateLimit = checkRateLimit(request, 5, 60, 'contact');
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rateLimit.reset} seconds before trying again.` },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload provided.' }, { status: 400 });
    }
    const { name, email, subject, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanSubject = sanitize(subject || 'General Inquiry');
    const cleanMessage = sanitize(message);

    // In production, send via SendGrid / Resend / AWS SES.
    console.log(`[Contact Form Received] Subject: ${cleanSubject}, Status: Processed (Sender: [REDACTED])`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
    });
  } catch (error) {
    return createErrorResponse('Failed to process message.', error, 500);
  }
}
