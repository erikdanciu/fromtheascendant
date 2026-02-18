import { prisma } from './db';
import { generateAstrologyContent, type ContentType } from './claude';
import { getDateKey } from './astrology';
import type { Prisma } from '@prisma/client';

interface ContentData {
  introduction: string;
  signs: Record<string, string>;
  generatedAt: string;
  [key: string]: string | Record<string, string>;
}

export async function getCachedContent(
  type: ContentType,
  dateKey?: string
): Promise<ContentData | null> {
  const key = dateKey || getDateKey();

  const content = await prisma.generatedContent.findUnique({
    where: {
      type_dateKey: {
        type,
        dateKey: key,
      },
    },
  });

  if (!content) {
    return null;
  }

  return content.content as unknown as ContentData;
}

export async function generateAndCacheContent(
  type: ContentType,
  dateKey?: string
): Promise<ContentData> {
  const key = dateKey || getDateKey();

  // Generate content using Claude
  const rawContent = await generateAstrologyContent(type, { date: key });

  // Parse the content into sections
  const contentData = parseGeneratedContent(rawContent);

  // Store in database
  await prisma.generatedContent.upsert({
    where: {
      type_dateKey: {
        type,
        dateKey: key,
      },
    },
    update: {
      content: contentData as unknown as Prisma.InputJsonValue,
      updatedAt: new Date(),
    },
    create: {
      type,
      dateKey: key,
      content: contentData as unknown as Prisma.InputJsonValue,
    },
  });

  return contentData;
}

function parseGeneratedContent(rawContent: string): ContentData {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const signSections: Record<string, string> = {};
  let introduction = '';

  // Split by sign headers
  const lines = rawContent.split('\n');
  let currentSign: string | null = null;
  let currentContent: string[] = [];
  let introLines: string[] = [];
  let foundFirstSign = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if this line is a sign header
    const foundSign = signs.find(sign => {
      const patterns = [
        new RegExp(`^#{1,3}\\s*${sign}`, 'i'),
        new RegExp(`^\\*\\*${sign}\\*\\*`, 'i'),
        new RegExp(`^${sign}$`, 'i'),
        new RegExp(`^${sign}:`, 'i'),
        new RegExp(`^${sign} Rising`, 'i'),
        new RegExp(`^Moon in ${sign}`, 'i'),
      ];
      return patterns.some(p => p.test(trimmedLine));
    });

    if (foundSign) {
      // Save previous sign content
      if (currentSign) {
        signSections[currentSign] = currentContent.join('\n').trim();
      }
      currentSign = foundSign;
      currentContent = [];
      foundFirstSign = true;
    } else if (currentSign) {
      currentContent.push(line);
    } else if (!foundFirstSign) {
      introLines.push(line);
    }
  }

  // Save last sign
  if (currentSign) {
    signSections[currentSign] = currentContent.join('\n').trim();
  }

  introduction = introLines.join('\n').trim();

  // Clean up introduction - remove markdown headers
  introduction = introduction.replace(/^#{1,3}\s+.*\n?/gm, '').trim();

  return {
    introduction,
    signs: signSections,
    generatedAt: new Date().toISOString(),
  };
}

export async function getOrGenerateContent(
  type: ContentType,
  dateKey?: string
): Promise<ContentData> {
  const cached = await getCachedContent(type, dateKey);
  
  if (cached) {
    return cached;
  }

  return generateAndCacheContent(type, dateKey);
}
