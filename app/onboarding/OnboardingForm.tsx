'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const formData = new FormData(e.currentTarget);
    const birthDate = formData.get('birthDate') as string;
    const birthTime = formData.get('birthTime') as string;
    const birthLocation = formData.get('birthLocation') as string;

    try {
      const response = await fetch('/api/user/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate, birthTime, birthLocation }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
          Birth date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          required
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium mb-2">
          Birth time <span className="text-muted">(optional)</span>
        </label>
        <input
          type="time"
          id="birthTime"
          name="birthTime"
          disabled={status === 'loading'}
        />
        <p className="text-xs text-muted mt-1">
          If known, this allows us to calculate your rising sign.
        </p>
      </div>

      <div>
        <label htmlFor="birthLocation" className="block text-sm font-medium mb-2">
          Birth city <span className="text-muted">(optional)</span>
        </label>
        <input
          type="text"
          id="birthLocation"
          name="birthLocation"
          placeholder="e.g., New York, NY"
          disabled={status === 'loading'}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full"
      >
        {status === 'loading' ? 'Saving...' : 'Continue'}
      </button>

      <p className="text-xs text-muted text-center">
        You can update this information anytime in your settings.
      </p>
    </form>
  );
}
