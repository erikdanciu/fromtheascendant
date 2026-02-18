import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import { getCachedContent } from '@/lib/content';
import { getDateKey, ZODIAC_SIGNS } from '@/lib/astrology';

export const metadata: Metadata = {
  title: 'Mercury Retrograde | From The Ascendant',
  description: 'A grounded perspective on Mercury Retrograde for each zodiac sign. Themes of review, revisiting, and patience.',
  openGraph: {
    title: 'Mercury Retrograde | From The Ascendant',
    description: 'A grounded perspective on Mercury Retrograde for each zodiac sign.',
  },
};

export const dynamic = 'force-dynamic';

export default async function MercuryRetrogradePage() {
  const dateKey = getDateKey();
  const content = await getCachedContent('mercuryRetrograde', dateKey);

  return (
    <ArticleLayout
      title="Mercury Retrograde"
      subtitle="A time for review and reflection"
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
            Mercury Retrograde reflections will be available during the next retrograde period.
          </p>
          <p className="text-muted text-sm mt-2">
            Mercury goes retrograde approximately three times per year.
          </p>
        </div>
      )}
    </ArticleLayout>
  );
}
