import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicToken, createSession, setSessionCookie } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login?error=invalid', request.url));
  }

  const userId = await verifyMagicToken(token);

  if (!userId) {
    return NextResponse.redirect(new URL('/auth/login?error=expired', request.url));
  }

  // Create session
  const sessionToken = await createSession(userId);
  await setSessionCookie(sessionToken);

  // Check if user needs onboarding
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.birthDate) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
