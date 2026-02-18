import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import { getCachedContent } from '@/lib/content';
import { getDateKey } from '@/lib/astrology';

export const metadata: Metadata = {
  title: 'Natal Chart | From The Ascendant',
  description: 'A complete guide to understanding your birth chart—the map of the sky at the moment you were born.',
  openGraph: {
    title: 'Natal Chart | From The Ascendant',
    description: 'A complete guide to understanding your birth chart.',
  },
};

export const dynamic = 'force-dynamic';

export default async function NatalChartPage() {
  const dateKey = getDateKey();
  const content = await getCachedContent('natalChart', dateKey);

  return (
    <ArticleLayout
      title="The Natal Chart"
      subtitle="Understanding the map of your birth sky"
    >
      {content && content.introduction ? (
        <div className="mb-12">
          {content.introduction.split('\n').filter(Boolean).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : (
        <div className="py-12">
          <h2>What is a Natal Chart?</h2>
          <p className="mb-6">
            A natal chart, also known as a birth chart, is a snapshot of the sky at the exact moment you were born. It maps out where the Sun, Moon, and planets were positioned relative to Earth and the horizon line at your specific time and place of birth.
          </p>
          <p className="mb-6">
            Think of it as a celestial fingerprint—no two natal charts are exactly alike, even for twins born minutes apart. The chart is divided into twelve sections called houses, each governing different areas of life, and populated by planets in various zodiac signs.
          </p>

          <h2>The Key Components</h2>
          <p className="mb-4">
            <strong>The Planets</strong> represent different aspects of your personality and life force. The Sun represents your core identity, the Moon your emotional nature, Mercury your communication style, Venus your approach to love and beauty, and Mars your drive and assertiveness.
          </p>
          <p className="mb-4">
            <strong>The Signs</strong> color how each planet expresses itself. A Venus in Aries expresses love differently than a Venus in Pisces—one is bold and direct, the other gentle and romantic.
          </p>
          <p className="mb-4">
            <strong>The Houses</strong> show where in your life these energies play out. The first house relates to self and identity, the seventh to partnerships, the tenth to career and public life, and so on through all twelve houses.
          </p>
          <p className="mb-6">
            <strong>Aspects</strong> are the geometric relationships between planets. When planets are in certain angles to each other (like 90° or 120°), they create dynamic interactions that shape your personality and life experiences.
          </p>

          <h2>Why Birth Time and Location Matter</h2>
          <p className="mb-6">
            Your birth time determines your Rising sign (Ascendant) and the positions of all the houses. The Ascendant changes approximately every two hours, so even a rough estimate of birth time can significantly affect your chart interpretation.
          </p>
          <p className="mb-6">
            Your birth location matters because it determines the local horizon and the exact angles of the house cusps. Someone born at the same moment in New York and Tokyo would have the same planetary positions but different house placements.
          </p>

          <h2>Beginning to Understand Your Chart</h2>
          <p className="mb-6">
            Start with the basics: Sun, Moon, and Rising. These three placements give you a foundation for understanding yourself. Your Sun sign represents your conscious self and life purpose, your Moon sign reveals your emotional needs, and your Rising sign shows how you appear to others.
          </p>
          <p className="mb-6">
            From there, you can explore the positions of other planets, paying attention to any clusters of planets in particular signs or houses. Look for patterns—are most of your planets above or below the horizon? In fire signs or water signs? These patterns tell a story.
          </p>
          <p>
            Remember that astrology is a language of symbols and archetypes. It offers a framework for self-reflection, not a rigid set of predictions. Your chart reveals tendencies and themes, but you are always the author of your own story.
          </p>
        </div>
      )}
    </ArticleLayout>
  );
}
