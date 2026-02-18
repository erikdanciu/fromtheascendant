import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoonPhaseDisplay from '@/components/MoonPhaseDisplay';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { getMoonPhase, getNextMoonEvent, formatDateForDisplay } from '@/lib/astrology';
import { ZODIAC_SIGNS } from '@/lib/zodiac-data';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const moonPhase = getMoonPhase();
  const nextFullMoon = getNextMoonEvent('full-moon');
  const nextNewMoon = getNextMoonEvent('new-moon');

  // Get current sun sign
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  const getSunSeason = () => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
    return 'pisces';
  };
  
  const currentSeason = getSunSeason();
  const currentSign = ZODIAC_SIGNS[currentSeason];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Content Focused */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Thoughtful astrology for reflection, not prediction
            </h1>
            <p className="text-stone text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              A calm publication anchored to the lunar cycle. We offer perspective on 
              celestial timing without telling you what will happen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/today" 
                className="px-6 py-3 bg-charcoal text-cream rounded-lg hover:bg-charcoal/90 transition-colors"
              >
                See Today&apos;s Sky
              </Link>
              <Link 
                href="/find-your-sign" 
                className="px-6 py-3 border border-charcoal text-charcoal rounded-lg hover:bg-charcoal hover:text-cream transition-colors"
              >
                Find Your Sign
              </Link>
            </div>
          </div>
        </section>

        {/* Current Moon Phase - Featured */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <Link href="/today" className="block bg-white border border-border rounded-lg p-8 hover:border-charcoal transition-colors">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <MoonPhaseDisplay 
                  phase={moonPhase.phase} 
                  name={moonPhase.name} 
                  illumination={moonPhase.illumination}
                  size="md"
                />
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted uppercase tracking-wider mb-2">Current Moon</p>
                  <p className="font-serif text-2xl mb-2">{moonPhase.name}</p>
                  <p className="text-stone">
                    {moonPhase.illumination}% illuminated
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Current Season */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <p className="text-sm text-muted uppercase tracking-wider mb-6 text-center">
              Current Season
            </p>
            <Link 
              href={`/signs/${currentSeason}`}
              className="block bg-white border border-border rounded-lg p-8 hover:border-charcoal transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-5xl">{currentSign.symbol}</span>
                <div>
                  <p className="font-serif text-2xl mb-1">{currentSign.name} Season</p>
                  <p className="text-stone text-sm">{currentSign.dates}</p>
                </div>
              </div>
              <p className="text-stone mt-4">
                {currentSign.description.slice(0, 200)}...
              </p>
            </Link>
          </div>
        </section>

        {/* Lunar Events */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <p className="text-sm text-muted uppercase tracking-wider mb-8 text-center">
              Upcoming Lunar Events
            </p>
            <div className="grid gap-6">
              <ArticleCard
                title="Full Moon"
                description="Themes of culmination, illumination, and release. What has been building comes to light."
                href="/full-moon"
                date={`Next: ${formatDateForDisplay(nextFullMoon)}`}
              />
              <ArticleCard
                title="New Moon"
                description="A time for beginnings, intention-setting, and quiet contemplation in the darkness."
                href="/new-moon"
                date={`Next: ${formatDateForDisplay(nextNewMoon)}`}
              />
            </div>
          </div>
        </section>

        {/* Browse by Sign */}
        <section className="py-16 px-6 border-t border-border bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted uppercase tracking-wider mb-8 text-center">
              Browse by Sign
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Object.entries(ZODIAC_SIGNS).map(([key, sign]) => (
                <Link
                  key={key}
                  href={`/signs/${key}`}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-cream transition-colors"
                >
                  <span className="text-2xl mb-1">{sign.symbol}</span>
                  <span className="text-xs text-stone">{sign.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <p className="text-sm text-muted uppercase tracking-wider mb-8 text-center">
              Understanding Your Chart
            </p>
            <div className="grid gap-6">
              <ArticleCard
                title="Rising Sign"
                description="Your ascendant shapes how you meet the world and how the world sees you."
                href="/rising-sign"
              />
              <ArticleCard
                title="Moon Sign"
                description="Your lunar placement reveals your emotional nature and inner needs."
                href="/moon-sign"
              />
              <ArticleCard
                title="The Natal Chart"
                description="A complete guide to understanding the map of the sky at your birth."
                href="/natal-chart"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 border-t border-border bg-white">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl mb-4">A Different Approach</h2>
            <p className="text-stone mb-6">
              We don&apos;t make predictions. We don&apos;t use fear to drive engagement. 
              We offer thoughtful perspective tied to celestial timing, for those 
              who find value in such reflection.
            </p>
            <Link 
              href="/about" 
              className="text-charcoal underline hover:no-underline"
            >
              Read our philosophy
            </Link>
          </div>
        </section>

        {/* Subtle Signup - Secondary */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-sm text-muted uppercase tracking-wider mb-4">
              Go Deeper
            </p>
            <h2 className="font-serif text-2xl mb-4">
              Weekly Personal Readings
            </h2>
            <p className="text-stone mb-6">
              Sign in to receive a weekly reflection written for your sun sign, 
              delivered every Monday.
            </p>
            <Link 
              href="/auth/login"
              className="inline-block px-6 py-3 border border-charcoal text-charcoal rounded-lg hover:bg-charcoal hover:text-cream transition-colors"
            >
              Sign In or Create Account
            </Link>
            <p className="text-xs text-muted mt-4">
              Free. We only ask for your birth date.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
