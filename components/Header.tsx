import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-cream">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif tracking-wide hover:opacity-70 transition-opacity">
            From The Ascendant
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/today" className="text-stone hover:text-charcoal transition-colors">
              Today
            </Link>
            <Link href="/find-your-sign" className="text-stone hover:text-charcoal transition-colors">
              Find Your Sign
            </Link>
            <Link href="/full-moon" className="text-stone hover:text-charcoal transition-colors">
              Full Moon
            </Link>
            <Link href="/about" className="text-stone hover:text-charcoal transition-colors">
              About
            </Link>
            <Link href="/auth/login" className="text-stone hover:text-charcoal transition-colors">
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link href="/today" className="text-stone hover:text-charcoal transition-colors text-sm">
              Menu
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
