import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import { getCachedContent } from '@/lib/content';
import { getDateKey, ZODIAC_SIGNS } from '@/lib/astrology';

export const metadata: Metadata = {
  title: 'Rising Sign (Ascendant) | From The Ascendant',
  description: 'Understanding your Rising Sign and how your Ascendant shapes how you meet the world.',
  openGraph: {
    title: 'Rising Sign (Ascendant) | From The Ascendant',
    description: 'Understanding your Rising Sign and how your Ascendant shapes how you meet the world.',
  },
};

export const dynamic = 'force-dynamic';

export default async function RisingSignPage() {
  const dateKey = getDateKey();
  const content = await getCachedContent('risingSign', dateKey);

  return (
    <ArticleLayout
      title="Rising Sign"
      subtitle="Your Ascendant and how you meet the world"
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
              <h2>{sign} Rising</h2>
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
            Your Rising Sign, also called the Ascendant, is determined by the zodiac sign that was rising on the eastern horizon at the exact moment of your birth. Unlike your Sun sign, which changes approximately every 30 days, your Rising sign changes roughly every two hours.
          </p>
          <p className="mb-6">
            The Rising sign shapes your outer personality—how you present yourself to others, your first impressions, and your overall approach to life. While your Sun sign represents your core identity and your Moon sign reflects your emotional nature, your Rising sign is the mask you wear and the lens through which the world sees you.
          </p>
          <p className="mb-6">
            To calculate your Rising sign accurately, you need to know your exact birth time and location. Even a difference of a few minutes can sometimes change the Rising sign, especially if you were born near the cusp between two signs.
          </p>
          <p className="text-muted text-sm">
            Detailed Rising sign profiles are generated periodically. Check back soon.
          </p>
        </div>
      )}
    </ArticleLayout>
  );
}
