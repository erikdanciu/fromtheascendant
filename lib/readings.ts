import { prisma } from './db';
import { generateAstrologyContent } from './claude';
import { getWeekKey, getMoonPhase, getCurrentTransitTheme } from './astrology';
import { sendWeeklyReadingEmail } from './email';

// Get or generate a cached reading based on sign combination
async function getOrCreateSignReading(
  sunSign: string,
  risingSign: string | null,
  moonPhase: string,
  weekKey: string
): Promise<string> {
  // Check if we already have a cached reading for this sign combination
  const cached = await prisma.signReadingCache.findUnique({
    where: {
      weekKey_sunSign_risingSign_moonPhase: {
        weekKey,
        sunSign,
        risingSign: risingSign || '',
        moonPhase,
      },
    },
  });

  if (cached) {
    return cached.text;
  }

  // Generate new reading
  const transitTheme = getCurrentTransitTheme();
  const reading = await generateAstrologyContent('weeklyPersonal', {
    sunSign,
    risingSign: risingSign || undefined,
    moonPhase,
    transitTheme,
  });

  // Cache it for other users with same sign combination
  await prisma.signReadingCache.create({
    data: {
      weekKey,
      sunSign,
      risingSign: risingSign || '',
      moonPhase,
      text: reading,
    },
  });

  return reading;
}

export async function generateWeeklyReadingForUser(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.birthDate) {
    throw new Error('User not found or missing birth date');
  }

  const weekKey = getWeekKey();
  const moonPhase = getMoonPhase();

  // Check if user already has a reading for this week
  const existing = await prisma.weeklyReading.findUnique({
    where: {
      userId_weekKey: {
        userId,
        weekKey,
      },
    },
  });

  if (existing) {
    return existing.text;
  }

  // Get or create cached reading based on sign combination
  const reading = await getOrCreateSignReading(
    user.sunSign || 'Aries',
    user.risingSign,
    moonPhase.name,
    weekKey
  );

  // Store reference for this user
  await prisma.weeklyReading.create({
    data: {
      userId,
      weekKey,
      text: reading,
      moonPhase: moonPhase.name,
    },
  });

  return reading;
}

export async function generateAndSendWeeklyReadings(): Promise<{
  total: number;
  success: number;
  failed: number;
}> {
  // Get all users with birth dates
  const users = await prisma.user.findMany({
    where: {
      birthDate: { not: null },
    },
  });

  let success = 0;
  let failed = 0;

  for (const user of users) {
    try {
      // Generate reading
      const reading = await generateWeeklyReadingForUser(user.id);

      // Send email
      await sendWeeklyReadingEmail(user.email, reading, user.sunSign);

      success++;
    } catch (error) {
      console.error(`Failed to generate/send reading for user ${user.id}:`, error);
      failed++;
    }
  }

  // Log cron run
  await prisma.cronLog.create({
    data: {
      type: 'weekly-readings',
      status: failed === 0 ? 'success' : 'partial',
      message: `Generated ${success} readings, ${failed} failed out of ${users.length} users`,
    },
  });

  return {
    total: users.length,
    success,
    failed,
  };
}
