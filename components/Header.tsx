import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-cream">
      <div className="max-w-article mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif tracking-wide hover:opacity-70 transition-opacity">
            From The Ascendant
          </Link>
          <div className="flex items-center gap-8 text-sm">
            <Link href="/full-moon" className="text-stone hover:text-charcoal transition-colors">
              Full Moon
            </Link>
            <Link href="/new-moon" className="text-stone hover:text-charcoal transition-colors">
              New Moon
            </Link>
            <Link href="/auth/login" className="text-stone hover:text-charcoal transition-colors">
              Sign In
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
