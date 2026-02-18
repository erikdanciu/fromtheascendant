import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | From The Ascendant',
  description: 'We are a calm astrology publication offering thoughtful lunar reflections. No predictions, no hype — just grounded perspective for your week.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="max-w-article mx-auto px-6 py-16">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">About Us</h1>
            <p className="text-stone text-lg">A different kind of astrology publication</p>
          </header>

          <div className="prose prose-lg mx-auto">
            <h2 className="font-serif text-2xl mb-4">Our Philosophy</h2>
            <p className="text-stone leading-relaxed mb-6">
              From The Ascendant exists because we believe astrology deserves better than clickbait 
              predictions and fear-based content. We are not here to tell you what will happen. 
              We are here to offer perspective on the present moment.
            </p>

            <p className="text-stone leading-relaxed mb-6">
              Our writing is grounded in the rhythms of the lunar cycle — the waxing and waning, 
              the illumination and the darkness. These patterns have been observed for millennia, 
              and we find meaning in tracking them without mysticism or exaggeration.
            </p>

            <h2 className="font-serif text-2xl mb-4 mt-12">What We Are Not</h2>
            <ul className="text-stone space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-muted">—</span>
                <span>We do not make predictions about your future</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted">—</span>
                <span>We do not offer medical, financial, or legal advice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted">—</span>
                <span>We do not use fear to drive engagement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted">—</span>
                <span>We do not promise transformation or manifestation</span>
              </li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 mt-12">What We Are</h2>
            <p className="text-stone leading-relaxed mb-6">
              We are a publication. Like a thoughtful magazine you might read with morning coffee, 
              we offer essays and reflections tied to celestial timing. Our content is written 
              to be re-read, pondered, and returned to.
            </p>

            <p className="text-stone leading-relaxed mb-6">
              Each piece invites reflection rather than reaction. We write about themes — 
              completion and beginnings, illumination and rest, expansion and contraction. 
              These are useful lenses for examining your own life, whatever you believe about 
              the stars.
            </p>

            <h2 className="font-serif text-2xl mb-4 mt-12">The Lunar Cycle</h2>
            <p className="text-stone leading-relaxed mb-6">
              We anchor our publication to the moon because it provides a natural rhythm for 
              reflection. Every 29.5 days, the cycle completes. Within that cycle are moments 
              of fullness and emptiness, building and releasing.
            </p>

            <p className="text-stone leading-relaxed mb-6">
              You do not need to believe the moon controls your emotions to find value in 
              pausing during significant lunar moments. The calendar is arbitrary; the lunar 
              cycle is ancient and observable.
            </p>

            <h2 className="font-serif text-2xl mb-4 mt-12">Your Privacy</h2>
            <p className="text-stone leading-relaxed mb-6">
              If you choose to receive weekly readings, we ask for your birth date to determine 
              your sun sign. This is the only personal information we require. We do not sell 
              data, we do not track extensively, and we do not send promotional emails.
            </p>

            <p className="text-stone leading-relaxed mb-6">
              You can read everything on this site without signing up. The weekly personal 
              readings are simply a deeper layer for those who want it.
            </p>

            <div className="border-t border-border pt-12 mt-12 text-center">
              <p className="text-muted italic">
                &ldquo;The sky is not a map of your fate. It is a mirror for your attention.&rdquo;
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
