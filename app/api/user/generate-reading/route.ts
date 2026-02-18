import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { generateWeeklyReadingForUser } from '@/lib/readings';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.birthDate) {
      return NextResponse.json({ error: 'Please complete onboarding first' }, { status: 400 });
    }

    const reading = await generateWeeklyReadingForUser(user.id);

    return NextResponse.json({ success: true, reading });
  } catch (error) {
    console.error('Generate reading error:', error);
    return NextResponse.json({ error: 'Failed to generate reading' }, { status: 500 });
  }
}
