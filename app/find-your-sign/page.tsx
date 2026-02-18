import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignFinder from '@/components/SignFinder';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Sun Sign | From The Ascendant',
  description: 'Discover your zodiac sun sign based on your birthday. Enter your birth date to find out which of the 12 zodiac signs is yours.',
};

const ALL_SIGNS = [
  { sign: 'Aries', symbol: '♈', dates: 'Mar 21 – Apr 19' },
  { sign: 'Taurus', symbol: '♉', dates: 'Apr 20 – May 20' },
  { sign: 'Gemini', symbol: '♊', dates: 'May 21 – Jun 20' },
  { sign: 'Cancer', symbol: '♋', dates: 'Jun 21 – Jul 22' },
  { sign: 'Leo', symbol: '♌', dates: 'Jul 23 – Aug 22' },
  { sign: 'Virgo', symbol: '♍', dates: 'Aug 23 – Sep 22' },
  { sign: 'Libra', symbol: '♎', dates: 'Sep 23 – Oct 22' },
  { sign: 'Scorpio', symbol: '♏', dates: 'Oct 23 – Nov 21' },
  { sign: 'Sagittarius', symbol: '♐', dates: 'Nov 22 – Dec 21' },
  { sign: 'Capricorn', symbol: '♑', dates: 'Dec 22 – Jan 19' },
  { sign: 'Aquarius', symbol: '♒', dates: 'Jan 20 – Feb 18' },
  { sign: 'Pisces', symbol: '♓', dates: 'Feb 19 – Mar 20' },
];

export default function FindYourSignPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 px-6">
          <div className="max-w-article mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Find Your Sun Sign</h1>
            <p className="text-stone text-lg max-w-xl mx-auto">
              Your sun sign is determined by where the sun was positioned at the time of your birth. 
              Enter your birthday below to discover yours.
            </p>
          </div>

          <SignFinder />
        </section>

        {/* All Signs Reference */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl text-center mb-8">All Twelve Signs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ALL_SIGNS.map((zodiac) => (
                <Link
                  key={zodiac.sign}
                  href={`/signs/${zodiac.sign.toLowerCase()}`}
                  className="bg-white border border-border rounded-lg p-4 text-center hover:border-charcoal transition-colors"
                >
                  <div className="text-3xl mb-2">{zodiac.symbol}</div>
                  <div className="font-serif text-lg">{zodiac.sign}</div>
                  <div className="text-xs text-muted mt-1">{zodiac.dates}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Understanding Your Sign */}
        <section className="py-16 px-6 border-t border-border bg-white">
          <div className="max-w-article mx-auto">
            <h2 className="font-serif text-2xl text-center mb-8">Beyond the Sun Sign</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/rising-sign" className="block p-6 border border-border rounded-lg hover:border-charcoal transition-colors">
                <h3 className="font-serif text-lg mb-2">Rising Sign</h3>
                <p className="text-sm text-stone">
                  Your ascendant, determined by your exact birth time and location.
                </p>
              </Link>
              <Link href="/moon-sign" className="block p-6 border border-border rounded-lg hover:border-charcoal transition-colors">
                <h3 className="font-serif text-lg mb-2">Moon Sign</h3>
                <p className="text-sm text-stone">
                  Your emotional nature and inner world, based on lunar position.
                </p>
              </Link>
              <Link href="/natal-chart" className="block p-6 border border-border rounded-lg hover:border-charcoal transition-colors">
                <h3 className="font-serif text-lg mb-2">Natal Chart</h3>
                <p className="text-sm text-stone">
                  The complete map of all planetary positions at your birth.
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
