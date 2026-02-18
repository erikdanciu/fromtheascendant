import { NextRequest, NextResponse } from 'next/server';
import { generateAndSendWeeklyReadings } from '@/lib/readings';

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = await generateAndSendWeeklyReadings();

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Weekly readings cron error:', error);

    return NextResponse.json(
      { error: 'Failed to generate weekly readings' },
      { status: 500 }
    );
  }
}
