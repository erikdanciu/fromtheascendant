import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoonPhaseDisplay from '@/components/MoonPhaseDisplay';
import Link from 'next/link';
import { Metadata } from 'next';
import { getMoonPhase, getNextMoonEvent, formatDateForDisplay, getCurrentTransitTheme } from '@/lib/astrology';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Today\'s Sky | Current Moon Phase & Cosmic Weather | From The Ascendant',
  description: 'Check the current moon phase, upcoming lunar events, and the themes present in the sky right now. Updated daily.',
};

export default function TodayPage() {
  const moonPhase = getMoonPhase();
  const nextFullMoon = getNextMoonEvent('full-moon');
  const nextNewMoon = getNextMoonEvent('new-moon');
  const nextFirstQuarter = getNextMoonEvent('first-quarter');
  const nextLastQuarter = getNextMoonEvent('last-quarter');
  const transitTheme = getCurrentTransitTheme();
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Determine which sun sign season we're in
  const getSunSeason = () => {
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  const sunSeason = getSunSeason();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 px-6 text-center">
          <p className="text-sm text-muted uppercase tracking-wider mb-4">{formattedDate}</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Today&apos;s Sky</h1>
          <p className="text-stone text-lg max-w-xl mx-auto">
            A snapshot of current celestial conditions and the themes they carry.
          </p>
        </section>

        {/* Current Moon */}
        <section className="py-12 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <div className="bg-white border border-border rounded-lg p-8 text-center">
              <p className="text-sm text-muted uppercase tracking-wider mb-6">Current Moon</p>
              <MoonPhaseDisplay 
                phase={moonPhase.phase} 
                name={moonPhase.name} 
                illumination={moonPhase.illumination}
                size="lg"
              />
              <p className="text-stone mt-6 max-w-md mx-auto">
                {moonPhase.name === 'New Moon' && 
                  'The moon is dark, a time for quiet beginnings and internal work.'}
                {moonPhase.name === 'Waxing Crescent' && 
                  'The first sliver of light appears. Intentions set at the new moon begin to take form.'}
                {moonPhase.name === 'First Quarter' && 
                  'Half-illuminated, a time of action and decision. Momentum builds.'}
                {moonPhase.name === 'Waxing Gibbous' && 
                  'Light grows toward fullness. Refinement and adjustment before culmination.'}
                {moonPhase.name === 'Full Moon' && 
                  'Maximum illumination brings clarity and revelation. What has been building comes to light.'}
                {moonPhase.name === 'Waning Gibbous' && 
                  'Light begins to recede. A time for gratitude, sharing, and integration.'}
                {moonPhase.name === 'Last Quarter' && 
                  'Half-lit again, now in release. Letting go of what no longer serves.'}
                {moonPhase.name === 'Waning Crescent' && 
                  'The balsamic moon. Rest, restore, and prepare for the next cycle.'}
              </p>
            </div>
          </div>
        </section>

        {/* Sun Season */}
        <section className="py-12 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <div className="bg-white border border-border rounded-lg p-8 text-center">
              <p className="text-sm text-muted uppercase tracking-wider mb-4">Sun Season</p>
              <Link 
                href={`/signs/${sunSeason.toLowerCase()}`}
                className="font-serif text-3xl hover:opacity-70 transition-opacity"
              >
                {sunSeason} Season
              </Link>
              <p className="text-stone mt-4 max-w-md mx-auto">
                The sun is currently traveling through {sunSeason}. 
                <Link href={`/signs/${sunSeason.toLowerCase()}`} className="underline ml-1">
                  Read about {sunSeason} themes
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Current Theme */}
        {transitTheme && (
          <section className="py-12 px-6 border-t border-border">
            <div className="max-w-article mx-auto">
              <div className="bg-white border border-border rounded-lg p-8 text-center">
                <p className="text-sm text-muted uppercase tracking-wider mb-4">Current Theme</p>
                <p className="font-serif text-2xl mb-4">{transitTheme}</p>
                <p className="text-stone max-w-md mx-auto">
                  This theme colors the general atmosphere and may be reflected in personal and collective experience.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        <section className="py-12 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <h2 className="font-serif text-2xl text-center mb-8">Upcoming Lunar Events</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/new-moon" 
                className="bg-white border border-border rounded-lg p-6 hover:border-charcoal transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-serif text-lg">New Moon</p>
                    <p className="text-sm text-muted">{formatDateForDisplay(nextNewMoon)}</p>
                  </div>
                  <span className="text-2xl">🌑</span>
                </div>
              </Link>
              <Link 
                href="/first-quarter" 
                className="bg-white border border-border rounded-lg p-6 hover:border-charcoal transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-serif text-lg">First Quarter</p>
                    <p className="text-sm text-muted">{formatDateForDisplay(nextFirstQuarter)}</p>
                  </div>
                  <span className="text-2xl">🌓</span>
                </div>
              </Link>
              <Link 
                href="/full-moon" 
                className="bg-white border border-border rounded-lg p-6 hover:border-charcoal transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-serif text-lg">Full Moon</p>
                    <p className="text-sm text-muted">{formatDateForDisplay(nextFullMoon)}</p>
                  </div>
                  <span className="text-2xl">🌕</span>
                </div>
              </Link>
              <Link 
                href="/last-quarter" 
                className="bg-white border border-border rounded-lg p-6 hover:border-charcoal transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-serif text-lg">Last Quarter</p>
                    <p className="text-sm text-muted">{formatDateForDisplay(nextLastQuarter)}</p>
                  </div>
                  <span className="text-2xl">🌗</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Understanding Section */}
        <section className="py-16 px-6 border-t border-border bg-white">
          <div className="max-w-article mx-auto text-center">
            <h2 className="font-serif text-2xl mb-4">Working With the Sky</h2>
            <p className="text-stone max-w-xl mx-auto mb-8">
              We do not believe the sky controls your life. We find value in tracking natural rhythms 
              as a practice of attention and reflection. The moon waxes and wanes whether you notice or not—
              but noticing can be a useful practice.
            </p>
            <Link 
              href="/about" 
              className="text-charcoal underline hover:no-underline"
            >
              Read our philosophy
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
