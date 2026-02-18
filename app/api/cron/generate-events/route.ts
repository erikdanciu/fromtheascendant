import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateAndCacheContent } from '@/lib/content';
import { getDateKey, getNextMoonEvent } from '@/lib/astrology';
import type { ContentType } from '@/lib/claude';

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results: Record<string, { success: boolean; error?: string }> = {};

    // Moon event types to generate
    const eventTypes: { type: ContentType; getDate: () => Date }[] = [
      { type: 'fullMoon', getDate: () => getNextMoonEvent('full-moon') },
      { type: 'newMoon', getDate: () => getNextMoonEvent('new-moon') },
      { type: 'firstQuarter', getDate: () => getNextMoonEvent('first-quarter') },
      { type: 'lastQuarter', getDate: () => getNextMoonEvent('last-quarter') },
    ];

    // Generate content for events happening in the next 7 days
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

    // Also generate static content types (if not already cached)
    const staticTypes: ContentType[] = ['mercuryRetrograde', 'risingSign', 'moonSign', 'natalChart'];
    const currentDateKey = getDateKey();

    for (const type of staticTypes) {
      try {
        // Check if content exists for this month
        const monthKey = currentDateKey.substring(0, 7); // YYYY-MM
        const existing = await prisma.generatedContent.findFirst({
          where: {
            type,
            dateKey: { startsWith: monthKey },
          },
        });

        if (!existing) {
          await generateAndCacheContent(type, currentDateKey);
          results[type] = { success: true };
        } else {
          results[type] = { success: true, error: 'Already exists for this month' };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results[type] = { success: false, error: errorMessage };
      }
    }

    // Log cron run
    const successCount = Object.values(results).filter((r) => r.success).length;
    await prisma.cronLog.create({
      data: {
        type: 'generate-events',
        status: successCount === Object.keys(results).length ? 'success' : 'partial',
        message: JSON.stringify(results),
      },
    });

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Generate events cron error:', error);
    
    await prisma.cronLog.create({
      data: {
        type: 'generate-events',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    return NextResponse.json(
      { error: 'Failed to generate events' },
      { status: 500 }
    );
  }
}
