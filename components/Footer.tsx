import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cream mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-lg">
              From The Ascendant
            </Link>
            <p className="text-sm text-muted mt-2">
              Thoughtful astrology for reflection, not prediction.
            </p>
          </div>

          {/* Lunar Events */}
          <div>
            <p className="text-sm font-medium mb-3">Lunar Events</p>
            <nav className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/full-moon" className="hover:text-charcoal transition-colors">
                Full Moon
              </Link>
              <Link href="/new-moon" className="hover:text-charcoal transition-colors">
                New Moon
              </Link>
              <Link href="/first-quarter" className="hover:text-charcoal transition-colors">
                First Quarter
              </Link>
              <Link href="/last-quarter" className="hover:text-charcoal transition-colors">
                Last Quarter
              </Link>
              <Link href="/today" className="hover:text-charcoal transition-colors">
                Today&apos;s Sky
              </Link>
            </nav>
          </div>

          {/* Learn */}
          <div>
            <p className="text-sm font-medium mb-3">Learn</p>
            <nav className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/find-your-sign" className="hover:text-charcoal transition-colors">
                Find Your Sign
              </Link>
              <Link href="/rising-sign" className="hover:text-charcoal transition-colors">
                Rising Sign
              </Link>
              <Link href="/moon-sign" className="hover:text-charcoal transition-colors">
                Moon Sign
              </Link>
              <Link href="/natal-chart" className="hover:text-charcoal transition-colors">
                Natal Chart
              </Link>
              <Link href="/mercury-retrograde" className="hover:text-charcoal transition-colors">
                Mercury Retrograde
              </Link>
            </nav>
          </div>

          {/* About */}
          <div>
            <p className="text-sm font-medium mb-3">About</p>
            <nav className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/about" className="hover:text-charcoal transition-colors">
                Our Philosophy
              </Link>
              <Link href="/contact" className="hover:text-charcoal transition-colors">
                Contact
              </Link>
              <Link href="/auth/login" className="hover:text-charcoal transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted">
          <p>© {new Date().getFullYear()} From The Ascendant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
