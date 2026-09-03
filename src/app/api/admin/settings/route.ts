import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { createErrorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settingsList = await prisma.siteSetting.findMany();
    
    // Map list to key-value object
    const settings: Record<string, string> = {};
    for (const item of settingsList) {
      settings[item.key] = item.value;
    }

    return NextResponse.json({ settings, list: settingsList });
  } catch (error: any) {
    return createErrorResponse('Failed to fetch settings', error, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { settings, groupMapping } = await req.json();

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Settings object is required' }, { status: 400 });
    }

    // Strict validation for tracking scripts to eliminate XSS
    if (settings.ga4MeasurementId && !/^G-[A-Z0-9]{4,20}$/i.test(settings.ga4MeasurementId.trim())) {
      return NextResponse.json({ error: 'Invalid Google Analytics 4 Measurement ID format (expected e.g. G-XXXXXXXXXX)' }, { status: 400 });
    }
    if (settings.gtmContainerId && !/^GTM-[A-Z0-9]{4,20}$/i.test(settings.gtmContainerId.trim())) {
      return NextResponse.json({ error: 'Invalid Google Tag Manager Container ID format (expected e.g. GTM-XXXXXXX)' }, { status: 400 });
    }
    if (settings.metaPixelId && !/^[0-9]{5,25}$/.test(settings.metaPixelId.trim())) {
      return NextResponse.json({ error: 'Invalid Meta Pixel ID format (expected numbers only)' }, { status: 400 });
    }

    // Upsert each setting key-value pair
    const entries = Object.entries(settings);
    for (const [key, value] of entries) {
      const stringValue = typeof value === 'string' ? value.trim() : JSON.stringify(value);
      const groupName = groupMapping?.[key] || 'general';

      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: stringValue, groupName },
        create: { key, value: stringValue, groupName },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return createErrorResponse('Failed to update settings', error, 500);
  }
}
