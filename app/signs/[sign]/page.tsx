import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ZODIAC_SIGNS } from '@/lib/zodiac-data';

interface Props {
  params: Promise<{ sign: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sign } = await params;
  const data = ZODIAC_SIGNS[sign.toLowerCase()];
  
  if (!data) {
    return { title: 'Sign Not Found' };
  }

  return {
    title: `${data.name} | ${data.dates} | From The Ascendant`,
    description: `Explore ${data.name}, the ${data.element} sign. ${data.description.slice(0, 150)}...`,
  };
}

export function generateStaticParams() {
  return Object.keys(ZODIAC_SIGNS).map((sign) => ({ sign }));
}

export default async function SignPage({ params }: Props) {
  const { sign } = await params;
  const data = ZODIAC_SIGNS[sign.toLowerCase()];

  if (!data) {
    notFound();
  }

  const allSigns = Object.entries(ZODIAC_SIGNS);
  const currentIndex = allSigns.findIndex(([key]) => key === sign.toLowerCase());
  const prevSign = allSigns[(currentIndex - 1 + 12) % 12];
  const nextSign = allSigns[(currentIndex + 1) % 12];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-article mx-auto px-6 py-16">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="text-6xl mb-4">{data.symbol}</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">{data.name}</h1>
            <p className="text-stone text-lg">{data.dates}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm text-muted">
              <span>{data.element} Sign</span>
              <span>•</span>
              <span>{data.modality}</span>
              <span>•</span>
              <span>Ruled by {data.rulingPlanet}</span>
            </div>
          </header>

          {/* Traits */}
          <section className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {data.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-white border border-border rounded-full text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
          </section>

          {/* Main Description */}
          <section className="mb-12">
            <p className="text-lg text-stone leading-relaxed">{data.description}</p>
          </section>

          {/* Seasonal Meaning */}
          <section className="mb-12 bg-white border border-border rounded-lg p-8">
            <h2 className="font-serif text-xl mb-4">Seasonal Context</h2>
            <p className="text-stone leading-relaxed">{data.seasonalMeaning}</p>
          </section>

          {/* Strengths & Challenges */}
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-border rounded-lg p-8">
              <h2 className="font-serif text-xl mb-4">Strengths</h2>
              <ul className="space-y-3">
                {data.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone">
                    <span className="text-muted mt-1">○</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-border rounded-lg p-8">
              <h2 className="font-serif text-xl mb-4">Growth Areas</h2>
              <ul className="space-y-3">
                {data.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone">
                    <span className="text-muted mt-1">○</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Element Section */}
          <section className="mb-12 text-center">
            <h2 className="font-serif text-xl mb-4">{data.element} Element</h2>
            <p className="text-stone max-w-xl mx-auto">
              {data.element === 'Fire' && 
                'Fire signs share qualities of warmth, enthusiasm, and the drive to act. They bring energy and initiative, sometimes impulsively.'}
              {data.element === 'Earth' && 
                'Earth signs share qualities of groundedness, practicality, and connection to the material world. They bring stability and tangible results.'}
              {data.element === 'Air' && 
                'Air signs share qualities of intellect, communication, and social connection. They bring ideas, perspective, and the ability to connect.'}
              {data.element === 'Water' && 
                'Water signs share qualities of emotional depth, intuition, and sensitivity. They bring empathy, healing, and awareness of the unseen.'}
            </p>
          </section>

          {/* Navigation */}
          <nav className="flex justify-between items-center pt-8 border-t border-border">
            <Link
              href={`/signs/${prevSign[0]}`}
              className="flex items-center gap-2 text-stone hover:text-charcoal transition-colors"
            >
              <span>←</span>
              <span>{prevSign[1].name}</span>
            </Link>
            <Link
              href="/find-your-sign"
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              All Signs
            </Link>
            <Link
              href={`/signs/${nextSign[0]}`}
              className="flex items-center gap-2 text-stone hover:text-charcoal transition-colors"
            >
              <span>{nextSign[1].name}</span>
              <span>→</span>
            </Link>
          </nav>
        </article>

        {/* Related Content */}
        <section className="py-16 px-6 border-t border-border bg-white">
          <div className="max-w-article mx-auto">
            <h2 className="font-serif text-2xl text-center mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/rising-sign" className="block p-6 border border-border rounded-lg hover:border-charcoal transition-colors">
                <h3 className="font-serif text-lg mb-2">Rising Sign</h3>
                <p className="text-sm text-stone">
                  Your sun sign is just the beginning. Explore your ascendant.
                </p>
              </Link>
              <Link href="/moon-sign" className="block p-6 border border-border rounded-lg hover:border-charcoal transition-colors">
                <h3 className="font-serif text-lg mb-2">Moon Sign</h3>
                <p className="text-sm text-stone">
                  Your emotional nature lives in your moon placement.
                </p>
              </Link>
              <Link href="/full-moon" className="block p-6 border border-border rounded-lg hover:border-charcoal transition-colors">
                <h3 className="font-serif text-lg mb-2">Full Moon</h3>
                <p className="text-sm text-stone">
                  Read about the current lunar themes.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
