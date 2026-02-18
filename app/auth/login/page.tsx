import Link from 'next/link';
import EmailSignupForm from '@/components/EmailSignupForm';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <header className="py-6 px-6">
        <Link href="/" className="text-xl font-serif tracking-wide">
          From The Ascendant
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl mb-4">Welcome back</h1>
            <p className="text-stone">
              Enter your email to receive a sign-in link.
            </p>
          </div>

          {searchParams.error === 'invalid' && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm text-center">
              Invalid login link. Please try again.
            </div>
          )}

          {searchParams.error === 'expired' && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm text-center">
              This login link has expired. Please request a new one.
            </div>
          )}

          <EmailSignupForm buttonText="Send sign-in link" />

          <p className="text-center text-sm text-muted mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/" className="text-charcoal underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
