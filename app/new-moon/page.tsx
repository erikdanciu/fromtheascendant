import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import { getCachedContent } from '@/lib/content';
import { getDateKey, getNextMoonEvent, formatDateForDisplay, ZODIAC_SIGNS } from '@/lib/astrology';

export const metadata: Metadata = {
  title: 'New Moon | From The Ascendant',
  description: 'Reflections on the New Moon energy for each zodiac sign. A time for new beginnings and quiet contemplation.',
  openGraph: {
    title: 'New Moon | From The Ascendant',
    description: 'Reflections on the New Moon energy for each zodiac sign.',
  },
};

export const dynamic = 'force-dynamic';

export default async function NewMoonPage() {
  const dateKey = getDateKey();
  const content = await getCachedContent('newMoon', dateKey);
  const nextNewMoon = getNextMoonEvent('new-moon');

  return (
    <ArticleLayout
      title="New Moon"
      subtitle={`Next: ${formatDateForDisplay(nextNewMoon)}`}
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
            The New Moon reflection for this period is being prepared.
          </p>
          <p className="text-muted text-sm mt-2">
            Check back closer to the next New Moon.
          </p>
        </div>
      )}
    </ArticleLayout>
  );
}
