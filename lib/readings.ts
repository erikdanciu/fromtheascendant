import { prisma } from './db';
import { generateAstrologyContent } from './claude';
import { getWeekKey, getMoonPhase, getCurrentTransitTheme } from './astrology';
import { sendWeeklyReadingEmail } from './email';

export async function generateWeeklyReadingForUser(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.birthDate) {
    throw new Error('User not found or missing birth date');
  }

  const weekKey = getWeekKey();
  const moonPhase = getMoonPhase();
  const transitTheme = getCurrentTransitTheme();

  // Check if reading already exists
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

  // Generate reading using Claude
  const reading = await generateAstrologyContent('weeklyPersonal', {
    sunSign: user.sunSign || undefined,
    risingSign: user.risingSign || undefined,
    moonPhase: moonPhase.name,
    transitTheme,
  });

  // Store in database
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
