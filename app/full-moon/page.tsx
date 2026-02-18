import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import { getCachedContent } from '@/lib/content';
import { getDateKey, getNextMoonEvent, formatDateForDisplay, ZODIAC_SIGNS } from '@/lib/astrology';

export const metadata: Metadata = {
  title: 'Full Moon | From The Ascendant',
  description: 'Reflections on the Full Moon energy for each zodiac sign. Themes of culmination, illumination, and release.',
  openGraph: {
    title: 'Full Moon | From The Ascendant',
    description: 'Reflections on the Full Moon energy for each zodiac sign.',
  },
};

export const dynamic = 'force-dynamic';

export default async function FullMoonPage() {
  const dateKey = getDateKey();
  const content = await getCachedContent('fullMoon', dateKey);
  const nextFullMoon = getNextMoonEvent('full-moon');

  return (
    <ArticleLayout
      title="Full Moon"
      subtitle={`Next: ${formatDateForDisplay(nextFullMoon)}`}
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
            The Full Moon reflection for this period is being prepared.
          </p>
          <p className="text-muted text-sm mt-2">
            Check back closer to the next Full Moon.
          </p>
        </div>
      )}
    </ArticleLayout>
  );
}
