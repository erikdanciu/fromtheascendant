import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoonPhaseDisplay from '@/components/MoonPhaseDisplay';
import EmailSignupForm from '@/components/EmailSignupForm';
import ArticleCard from '@/components/ArticleCard';
import { getMoonPhase, getNextMoonEvent, formatDateForDisplay } from '@/lib/astrology';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const moonPhase = getMoonPhase();
  const nextFullMoon = getNextMoonEvent('full-moon');
  const nextNewMoon = getNextMoonEvent('new-moon');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              A calm space for reflection
            </h1>
            <p className="text-stone text-lg leading-relaxed mb-10">
              Receive a weekly personal reading based on the lunar cycle and your birth chart. 
              Thoughtful, grounded, and written for contemplation.
            </p>
            <EmailSignupForm />
          </div>
        </section>

        {/* Current Moon Phase */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-article mx-auto text-center">
            <p className="text-sm text-muted uppercase tracking-wider mb-6">Current Moon</p>
            <MoonPhaseDisplay 
              phase={moonPhase.phase} 
              name={moonPhase.name} 
              illumination={moonPhase.illumination}
              size="lg"
            />
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-article mx-auto">
            <p className="text-sm text-muted uppercase tracking-wider mb-8 text-center">
              Lunar Events
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

        {/* Final CTA */}
        <section className="py-20 px-6 border-t border-border bg-white">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-serif text-3xl mb-6">
              Begin your weekly practice
            </h2>
            <p className="text-stone mb-10">
              Every Monday, receive a personal reading written for your placements.
            </p>
            <EmailSignupForm buttonText="Start receiving readings" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
