import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // In production, send via SendGrid / Resend / AWS SES.
    console.log(`[Contact Form Received] From: ${name} (${email}), Subject: ${subject}, Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to process message.' }, { status: 500 });
  }
}
