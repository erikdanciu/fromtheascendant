'use client';

import { useState } from 'react';

interface EmailSignupFormProps {
  onSuccess?: () => void;
  buttonText?: string;
}

export default function EmailSignupForm({ onSuccess, buttonText = 'Get your weekly reading' }: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Check your email for a sign-in link.');
        onSuccess?.();
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-serif">{message}</p>
        <p className="text-sm text-muted mt-2">The link will expire in 15 minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="text-center"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full"
        >
          {status === 'loading' ? 'Sending...' : buttonText}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-3 text-center">{message}</p>
      )}
      <p className="text-xs text-muted mt-4 text-center">
        We&apos;ll send you a magic link to sign in. No password needed.
      </p>
    </form>
  );
}
