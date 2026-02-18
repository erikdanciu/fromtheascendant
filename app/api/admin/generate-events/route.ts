import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { generateAndCacheContent } from '@/lib/content';
import { getDateKey, getNextMoonEvent } from '@/lib/astrology';
import type { ContentType } from '@/lib/claude';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  return adminSession?.value === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results: Record<string, { success: boolean; error?: string }> = {};

    const eventTypes: { type: ContentType; getDate: () => Date }[] = [
      { type: 'fullMoon', getDate: () => getNextMoonEvent('full-moon') },
      { type: 'newMoon', getDate: () => getNextMoonEvent('new-moon') },
      { type: 'firstQuarter', getDate: () => getNextMoonEvent('first-quarter') },
      { type: 'lastQuarter', getDate: () => getNextMoonEvent('last-quarter') },
    ];

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    for (const event of eventTypes) {
      const eventDate = event.getDate();
      
      if (eventDate <= sevenDaysFromNow) {
        const dateKey = getDateKey(eventDate);
        
        try {
          await generateAndCacheContent(event.type, dateKey);
          results[event.type] = { success: true };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          results[event.type] = { success: false, error: errorMessage };
        }
      } else {
        results[event.type] = { success: true, error: 'Event not within 7 days' };
      }
    }

    const staticTypes: ContentType[] = ['risingSign', 'moonSign', 'natalChart'];
    const currentDateKey = getDateKey();

    for (const type of staticTypes) {
      try {
        await generateAndCacheContent(type, currentDateKey);
        results[type] = { success: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results[type] = { success: false, error: errorMessage };
      }
    }

    await prisma.cronLog.create({
      data: {
        type: 'generate-events',
        status: 'success',
        message: 'Triggered manually from admin',
      },
    });

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Admin generate events error:', error);
    return NextResponse.json({ error: 'Failed to generate events' }, { status: 500 });
  }
}
