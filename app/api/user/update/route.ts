import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getSunSign } from '@/lib/astrology';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { birthDate, birthTime, birthLocation } = await request.json();

    if (!birthDate) {
      return NextResponse.json({ error: 'Birth date is required' }, { status: 400 });
    }

    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json({ error: 'Invalid birth date' }, { status: 400 });
    }

    // Compute sun sign
    const sunSign = getSunSign(parsedBirthDate);

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        birthDate: parsedBirthDate,
        birthTime: birthTime || null,
        birthLocation: birthLocation || null,
        sunSign,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
