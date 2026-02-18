export const ZODIAC_SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

interface SignDateRange {
  sign: ZodiacSign;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

const SIGN_DATE_RANGES: SignDateRange[] = [
  { sign: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { sign: 'Taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { sign: 'Gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { sign: 'Cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { sign: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { sign: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { sign: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { sign: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { sign: 'Sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  { sign: 'Capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { sign: 'Aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { sign: 'Pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
];

export function getSunSign(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  for (const range of SIGN_DATE_RANGES) {
    if (range.startMonth === range.endMonth) {
      if (month === range.startMonth && day >= range.startDay && day <= range.endDay) {
        return range.sign;
      }
    } else if (range.startMonth > range.endMonth) {
      // Handles Capricorn (Dec-Jan)
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay)
      ) {
        return range.sign;
      }
    } else {
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay)
      ) {
        return range.sign;
      }
    }
  }

  // Fallback to Capricorn for edge cases
  return 'Capricorn';
}

export type MoonPhase =
  | 'new-moon'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full-moon'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent';

export interface MoonPhaseInfo {
  phase: MoonPhase;
  name: string;
  illumination: number;
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  // Known new moon date for reference
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const lunarCycle = 29.53058867; // days
  
  const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const lunarAge = daysSinceKnownNewMoon % lunarCycle;
  const normalizedAge = lunarAge < 0 ? lunarAge + lunarCycle : lunarAge;
  
  // Calculate illumination (0-100%)
  const illumination = Math.round((1 - Math.cos((normalizedAge / lunarCycle) * 2 * Math.PI)) / 2 * 100);
  
  // Determine phase
  const phasePercent = normalizedAge / lunarCycle;
  
  if (phasePercent < 0.0625) {
    return { phase: 'new-moon', name: 'New Moon', illumination };
  } else if (phasePercent < 0.1875) {
    return { phase: 'waxing-crescent', name: 'Waxing Crescent', illumination };
  } else if (phasePercent < 0.3125) {
    return { phase: 'first-quarter', name: 'First Quarter', illumination };
  } else if (phasePercent < 0.4375) {
    return { phase: 'waxing-gibbous', name: 'Waxing Gibbous', illumination };
  } else if (phasePercent < 0.5625) {
    return { phase: 'full-moon', name: 'Full Moon', illumination };
  } else if (phasePercent < 0.6875) {
    return { phase: 'waning-gibbous', name: 'Waning Gibbous', illumination };
  } else if (phasePercent < 0.8125) {
    return { phase: 'last-quarter', name: 'Last Quarter', illumination };
  } else if (phasePercent < 0.9375) {
    return { phase: 'waning-crescent', name: 'Waning Crescent', illumination };
  } else {
    return { phase: 'new-moon', name: 'New Moon', illumination };
  }
}

export function getWeekKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const week = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
}

export function getDateKey(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

// Rotating transit themes for weekly readings
const TRANSIT_THEMES = [
  'communication and expression',
  'relationships and connection',
  'creativity and self-expression',
  'home and foundations',
  'learning and expansion',
  'work and daily rhythms',
  'partnership dynamics',
  'transformation and release',
  'adventure and perspective',
  'structure and ambition',
  'community and innovation',
  'intuition and dreams',
];

export function getCurrentTransitTheme(): string {
  const weekNumber = parseInt(getWeekKey().split('-W')[1]);
  return TRANSIT_THEMES[weekNumber % TRANSIT_THEMES.length];
}

export function formatDateForDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getNextMoonEvent(type: 'new-moon' | 'full-moon' | 'first-quarter' | 'last-quarter'): Date {
  const today = new Date();
  const lunarCycle = 29.53058867;
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  
  const daysSinceKnownNewMoon = (today.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentLunarAge = daysSinceKnownNewMoon % lunarCycle;
  
  let targetAge: number;
  switch (type) {
    case 'new-moon':
      targetAge = 0;
      break;
    case 'first-quarter':
      targetAge = lunarCycle * 0.25;
      break;
    case 'full-moon':
      targetAge = lunarCycle * 0.5;
      break;
    case 'last-quarter':
      targetAge = lunarCycle * 0.75;
      break;
  }
  
  let daysUntil = targetAge - currentLunarAge;
  if (daysUntil <= 0) {
    daysUntil += lunarCycle;
  }
  
  const nextEvent = new Date(today.getTime() + daysUntil * 24 * 60 * 60 * 1000);
  return nextEvent;
}
