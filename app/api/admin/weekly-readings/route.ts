import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateAndSendWeeklyReadings } from '@/lib/readings';

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
    const results = await generateAndSendWeeklyReadings();
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Admin weekly readings error:', error);
    return NextResponse.json({ error: 'Failed to generate weekly readings' }, { status: 500 });
  }
}
