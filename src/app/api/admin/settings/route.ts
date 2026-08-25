import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const settingsList = await prisma.siteSetting.findMany();
    
    // Map list to key-value object
    const settings: Record<string, string> = {};
    for (const item of settingsList) {
      settings[item.key] = item.value;
    }

    return NextResponse.json({ settings, list: settingsList });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch settings' }, { status: 500 });
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

    // Upsert each setting key-value pair
    const entries = Object.entries(settings);
    for (const [key, value] of entries) {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const groupName = groupMapping?.[key] || 'general';

      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: stringValue, groupName },
        create: { key, value: stringValue, groupName },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
