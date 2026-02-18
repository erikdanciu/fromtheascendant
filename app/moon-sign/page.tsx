import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import { getCachedContent } from '@/lib/content';
import { getDateKey, ZODIAC_SIGNS } from '@/lib/astrology';

export const metadata: Metadata = {
  title: 'Moon Sign | From The Ascendant',
  description: 'Understanding your Moon Sign and how it reveals your emotional nature and inner needs.',
  openGraph: {
    title: 'Moon Sign | From The Ascendant',
    description: 'Understanding your Moon Sign and how it reveals your emotional nature.',
  },
};

export const dynamic = 'force-dynamic';

export default async function MoonSignPage() {
  const dateKey = getDateKey();
  const content = await getCachedContent('moonSign', dateKey);

  return (
    <ArticleLayout
      title="Moon Sign"
      subtitle="Your emotional nature and inner needs"
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
              <h2>Moon in {sign}</h2>
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
        <div className="py-12">
          <p className="mb-6">
            Your Moon sign represents your emotional inner world—how you process feelings, what makes you feel secure, and your instinctive reactions. While the Sun sign describes who you are becoming, the Moon sign reveals who you already are at your core.
          </p>
          <p className="mb-6">
            The Moon moves through each zodiac sign approximately every 2.5 days, making it important to know your birth time for an accurate Moon sign calculation. The Moon governs our needs, habits, and the parts of ourselves we might not show to the outside world.
          </p>
          <p className="mb-6">
            Understanding your Moon sign can help you recognize your emotional patterns, understand what you need to feel nurtured, and develop greater self-compassion.
          </p>
          <p className="text-muted text-sm">
            Detailed Moon sign profiles are generated periodically. Check back soon.
          </p>
        </div>
      )}
    </ArticleLayout>
  );
}
