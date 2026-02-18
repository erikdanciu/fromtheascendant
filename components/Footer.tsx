import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cream mt-auto">
      <div className="max-w-article mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-stone text-sm mb-6">
            From The Ascendant is the written home of The Ascendant.
          </p>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
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
            <Link href="/mercury-retrograde" className="hover:text-charcoal transition-colors">
              Mercury Retrograde
            </Link>
          </nav>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted mt-4">
            <Link href="/rising-sign" className="hover:text-charcoal transition-colors">
              Rising Sign
            </Link>
            <Link href="/moon-sign" className="hover:text-charcoal transition-colors">
              Moon Sign
            </Link>
            <Link href="/natal-chart" className="hover:text-charcoal transition-colors">
              Natal Chart
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
