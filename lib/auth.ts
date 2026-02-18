import { cookies } from 'next/headers';
import { prisma } from './db';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'fta_session';
const SESSION_EXPIRY_DAYS = 30;

export async function createMagicToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await prisma.magicToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
}

export async function verifyMagicToken(token: string): Promise<string | null> {
  const magicToken = await prisma.magicToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!magicToken) {
    return null;
  }

  if (magicToken.used) {
    return null;
  }

  if (new Date() > magicToken.expiresAt) {
    return null;
  }

  // Mark token as used
  await prisma.magicToken.update({
    where: { id: magicToken.id },
    data: { used: true },
  });

  return magicToken.userId;
}

export async function createSession(userId: string): Promise<string> {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  // Store session as a magic token with longer expiry
  await prisma.magicToken.create({
    data: {
      token: `session_${sessionToken}`,
      userId,
      expiresAt,
    },
  });

  return sessionToken;
}

export async function setSessionCookie(sessionToken: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60,
    path: '/',
  });
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const session = await prisma.magicToken.findUnique({
    where: { token: `session_${sessionToken}` },
    include: { user: true },
  });

  if (!session) {
    return null;
  }

  if (session.used || new Date() > session.expiresAt) {
    return null;
  }

  return session.user;
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await prisma.magicToken.deleteMany({
      where: { token: `session_${sessionToken}` },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getOrCreateUser(email: string) {
  const normalizedEmail = email.toLowerCase().trim();

  let user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: normalizedEmail,
      },
    });
  }

  return user;
}
