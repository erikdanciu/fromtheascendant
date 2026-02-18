import Anthropic from '@anthropic-ai/sdk';

let anthropicInstance: Anthropic | null = null;

function getAnthropic(): Anthropic {
  if (!anthropicInstance) {
    anthropicInstance = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropicInstance;
}

export type ContentType =
  | 'fullMoon'
  | 'newMoon'
  | 'firstQuarter'
  | 'lastQuarter'
  | 'mercuryRetrograde'
  | 'weeklyPersonal'
  | 'risingSign'
  | 'moonSign'
  | 'natalChart';

export interface AstrologyContext {
  sign?: string;
  sunSign?: string;
  risingSign?: string;
  moonPhase?: string;
  date?: string;
  transitTheme?: string;
}

const SYSTEM_PROMPT = `You are a thoughtful astrology writer for "From The Ascendant," a calm, reflective astrology publication. Your writing style must embody these principles:

TONE:
- Calm and reflective, like a trusted friend offering perspective
- Minimal and elegant - no excessive flourishes
- Trustworthy and grounded - not mystical or dramatic
- Non-commercial - this is a publication, not a product

RULES (STRICTLY FOLLOW):
- Never make predictions or use "you will"
- Never give medical, financial, or legal advice
- Avoid mystical clichés ("the universe," "manifesting," "vibes")
- Never mention AI, algorithms, or that content is generated
- Be specific but open-ended - invite reflection
- Write in second person but keep it gentle
- Focus on themes of the current moment, not fortune-telling
- Length should match the request - no padding

Your writing should feel like reading a thoughtful essay in a quality publication, not a daily horoscope column.`;

export async function generateAstrologyContent(
  type: ContentType,
  context: AstrologyContext
): Promise<string> {
  const prompt = buildPrompt(type, context);
  
  // Use Haiku for personalized readings (cheaper), Sonnet for public SEO content (higher quality)
  const model = type === 'weeklyPersonal' 
    ? 'claude-3-5-haiku-20241022' 
    : 'claude-sonnet-4-20250514';
  
  const maxTokens = type === 'weeklyPersonal' ? 800 : 1500;

  const message = await getAnthropic().messages.create({
    model,
    max_tokens: maxTokens,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    system: SYSTEM_PROMPT,
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  return textBlock.text;
}

function buildPrompt(type: ContentType, context: AstrologyContext): string {
  switch (type) {
    case 'fullMoon':
      return `Write a reflective article about the Full Moon on ${context.date || 'this week'}.

The article should:
- Begin with an introduction about Full Moon energy (150-200 words)
- Then provide a brief section for each of the 12 zodiac signs (80-120 words each)

Format:
Start with the introduction, then each sign section should begin with the sign name as a heading.

Focus on themes of culmination, illumination, and release without being prescriptive.`;

    case 'newMoon':
      return `Write a reflective article about the New Moon on ${context.date || 'this week'}.

The article should:
- Begin with an introduction about New Moon energy (150-200 words)
- Then provide a brief section for each of the 12 zodiac signs (80-120 words each)

Format:
Start with the introduction, then each sign section should begin with the sign name as a heading.

Focus on themes of beginnings, intention-setting, and quiet contemplation without being prescriptive.`;

    case 'firstQuarter':
      return `Write a reflective article about the First Quarter Moon on ${context.date || 'this week'}.

The article should:
- Begin with an introduction about First Quarter Moon energy (150-200 words)
- Then provide a brief section for each of the 12 zodiac signs (80-120 words each)

Format:
Start with the introduction, then each sign section should begin with the sign name as a heading.

Focus on themes of action, challenge, and building momentum without being prescriptive.`;

    case 'lastQuarter':
      return `Write a reflective article about the Last Quarter Moon on ${context.date || 'this week'}.

The article should:
- Begin with an introduction about Last Quarter Moon energy (150-200 words)
- Then provide a brief section for each of the 12 zodiac signs (80-120 words each)

Format:
Start with the introduction, then each sign section should begin with the sign name as a heading.

Focus on themes of reflection, reassessment, and letting go without being prescriptive.`;

    case 'mercuryRetrograde':
      return `Write a reflective article about the current Mercury Retrograde period.

The article should:
- Begin with a grounded introduction about Mercury Retrograde (200-250 words) that avoids fear-mongering
- Then provide a brief section for each of the 12 zodiac signs (80-120 words each)

Format:
Start with the introduction, then each sign section should begin with the sign name as a heading.

Focus on themes of review, revisiting, and patience without catastrophizing.`;

    case 'weeklyPersonal':
      return `Write a personalized weekly reading for someone with:
- Sun sign: ${context.sunSign || 'Unknown'}
${context.risingSign ? `- Rising sign: ${context.risingSign}` : ''}
- Current moon phase: ${context.moonPhase || 'Unknown'}
${context.transitTheme ? `- Current transit theme: ${context.transitTheme}` : ''}

Write 250-400 words. Be personal but not prescriptive. Offer themes for reflection this week based on the cosmic weather and their placements. End with a gentle question for contemplation.`;

    case 'risingSign':
      return `Write an educational article about Rising Signs (Ascendant) in astrology.

The article should:
- Begin with an introduction explaining what the Rising Sign is and why it matters (250-300 words)
- Then provide a section for each of the 12 rising signs (100-150 words each)

Format:
Start with the introduction, then each sign section should begin with the sign name as a heading (e.g., "Aries Rising").

Focus on how each rising sign shapes one's outer presentation and life approach.`;

    case 'moonSign':
      return `Write an educational article about Moon Signs in astrology.

The article should:
- Begin with an introduction explaining what the Moon Sign represents and its importance (250-300 words)
- Then provide a section for each of the 12 moon signs (100-150 words each)

Format:
Start with the introduction, then each sign section should begin with the sign name as a heading (e.g., "Moon in Aries").

Focus on emotional nature, inner needs, and how each moon sign processes feelings.`;

    case 'natalChart':
      return `Write an educational article about Natal Charts (Birth Charts) in astrology.

The article should:
- Explain what a natal chart is and how it's calculated (200-250 words)
- Describe the key components: planets, houses, aspects (300-400 words)
- Explain why birth time and location matter (150-200 words)
- Offer guidance on how to begin understanding one's own chart (150-200 words)

Write in an accessible way that welcomes beginners without being condescending.`;

    default:
      throw new Error(`Unknown content type: ${type}`);
  }
}

export async function generateSignContent(
  sign: string,
  type: ContentType,
  context: AstrologyContext
): Promise<string> {
  const prompt = `Write a brief ${type} reading for ${sign} (80-120 words).
${context.date ? `Date: ${context.date}` : ''}
${context.moonPhase ? `Moon phase: ${context.moonPhase}` : ''}

Be specific to this sign's themes and current cosmic weather. Reflective, not predictive.`;

  const message = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    system: SYSTEM_PROMPT,
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  return textBlock.text;
}
