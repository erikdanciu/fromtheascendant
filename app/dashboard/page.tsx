import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getMoonPhase, getWeekKey, getCurrentTransitTheme } from '@/lib/astrology';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoonPhaseDisplay from '@/components/MoonPhaseDisplay';
import GenerateReadingButton from './GenerateReadingButton';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (!user.birthDate) {
    redirect('/onboarding');
  }

  const moonPhase = getMoonPhase();
  const weekKey = getWeekKey();
  const transitTheme = getCurrentTransitTheme();

  // Get this week's reading if it exists
  const weeklyReading = await prisma.weeklyReading.findUnique({
    where: {
      userId_weekKey: {
        userId: user.id,
        weekKey,
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-article mx-auto">
          {/* Welcome Section */}
          <section className="text-center mb-16">
            <p className="text-sm text-muted uppercase tracking-wider mb-4">Welcome back</p>
            <h1 className="font-serif text-3xl mb-2">
              {user.sunSign} Sun
              {user.risingSign && `, ${user.risingSign} Rising`}
            </h1>
            <p className="text-stone">
              This week&apos;s theme: {transitTheme}
            </p>
          </section>

          {/* Current Moon */}
          <section className="mb-16 text-center">
            <MoonPhaseDisplay
              phase={moonPhase.phase}
              name={moonPhase.name}
              illumination={moonPhase.illumination}
              size="md"
            />
          </section>

          {/* Weekly Reading */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl mb-6 text-center">This Week For You</h2>
            
            {weeklyReading ? (
              <div className="bg-white border border-border p-8">
                <p className="text-sm text-muted mb-4">Week of {weekKey}</p>
                <div className="prose">
                  {weeklyReading.text.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-border p-8 text-center">
                <p className="text-stone mb-4">
                  Your personalized reading for this week hasn&apos;t been generated yet.
                </p>
                <GenerateReadingButton />
                <p className="text-sm text-muted mt-4">
                  Or wait until Monday when readings are sent automatically.
                </p>
              </div>
            )}
          </section>

          {/* Quick Links */}
          <section className="border-t border-border pt-8">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/settings" className="text-stone hover:text-charcoal transition-colors">
                Settings
              </Link>
              <Link href="/full-moon" className="text-stone hover:text-charcoal transition-colors">
                Full Moon
              </Link>
              <Link href="/new-moon" className="text-stone hover:text-charcoal transition-colors">
                New Moon
              </Link>
              <Link href={`/api/auth/logout`} className="text-stone hover:text-charcoal transition-colors">
                Sign Out
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
