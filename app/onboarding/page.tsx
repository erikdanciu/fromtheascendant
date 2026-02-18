import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import OnboardingForm from './OnboardingForm';

export default async function OnboardingPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (user.birthDate) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <header className="py-6 px-6">
        <span className="text-xl font-serif tracking-wide">
          From The Ascendant
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl mb-4">Tell us about yourself</h1>
            <p className="text-stone">
              Your birth details help us create personalized readings that reflect your unique placements.
            </p>
          </div>

          <OnboardingForm />
        </div>
      </main>
    </div>
  );
}
