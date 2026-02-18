import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-md mx-auto">
          <div className="mb-10">
            <Link href="/dashboard" className="text-sm text-muted hover:text-charcoal transition-colors">
              ← Back to dashboard
            </Link>
          </div>

          <h1 className="font-serif text-3xl mb-8">Settings</h1>

          <section className="mb-12">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted mb-4">
              Account
            </h2>
            <div className="bg-white border border-border p-6">
              <p className="text-sm text-muted mb-1">Email</p>
              <p>{user.email}</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted mb-4">
              Birth Information
            </h2>
            <SettingsForm
              birthDate={user.birthDate?.toISOString().split('T')[0] || ''}
              birthTime={user.birthTime || ''}
              birthLocation={user.birthLocation || ''}
            />
          </section>

          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted mb-4">
              Computed Signs
            </h2>
            <div className="bg-white border border-border p-6 space-y-4">
              <div>
                <p className="text-sm text-muted mb-1">Sun Sign</p>
                <p>{user.sunSign || 'Not calculated'}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Rising Sign</p>
                <p>{user.risingSign || 'Requires birth time'}</p>
              </div>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/api/auth/logout"
              className="text-red-600 text-sm hover:underline"
            >
              Sign out
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
