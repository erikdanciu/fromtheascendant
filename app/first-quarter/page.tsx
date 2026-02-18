import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import { getCachedContent } from '@/lib/content';
import { getDateKey, getNextMoonEvent, formatDateForDisplay, ZODIAC_SIGNS } from '@/lib/astrology';

export const metadata: Metadata = {
  title: 'First Quarter Moon | From The Ascendant',
  description: 'Reflections on the First Quarter Moon energy for each zodiac sign. Themes of action, challenge, and building momentum.',
  openGraph: {
    title: 'First Quarter Moon | From The Ascendant',
    description: 'Reflections on the First Quarter Moon energy for each zodiac sign.',
  },
};

export const dynamic = 'force-dynamic';

export default async function FirstQuarterPage() {
  const dateKey = getDateKey();
  const content = await getCachedContent('firstQuarter', dateKey);
  const nextFirstQuarter = getNextMoonEvent('first-quarter');

  return (
    <ArticleLayout
      title="First Quarter Moon"
      subtitle={`Next: ${formatDateForDisplay(nextFirstQuarter)}`}
    >
      {content ? (
        <>
          <div className="mb-12">
            {content.introduction.split('\n').filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {ZODIAC_SIGNS.map((sign) => (
            <section key={sign}>
              <h2>{sign}</h2>
              {content.signs[sign] ? (
                content.signs[sign].split('\n').filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))
              ) : (
                <p className="text-muted italic">Content coming soon.</p>
              )}
            </section>
          ))}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-stone">
            The First Quarter Moon reflection for this period is being prepared.
          </p>
          <p className="text-muted text-sm mt-2">
            Check back closer to the next First Quarter Moon.
          </p>
        </div>
      )}
    </ArticleLayout>
  );
}
