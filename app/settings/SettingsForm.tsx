'use client';

import { useState } from 'react';

interface SettingsFormProps {
  birthDate: string;
  birthTime: string;
  birthLocation: string;
}

export default function SettingsForm({ birthDate, birthTime, birthLocation }: SettingsFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      birthDate: formData.get('birthDate') as string,
      birthTime: formData.get('birthTime') as string,
      birthLocation: formData.get('birthLocation') as string,
    };

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Settings saved successfully.');
      } else {
        const result = await response.json();
        setStatus('error');
        setMessage(result.error || 'Failed to save settings.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border p-6 space-y-6">
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
          Birth Date
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          defaultValue={birthDate}
          required
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium mb-2">
          Birth Time
        </label>
        <input
          type="time"
          id="birthTime"
          name="birthTime"
          defaultValue={birthTime}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="birthLocation" className="block text-sm font-medium mb-2">
          Birth City
        </label>
        <input
          type="text"
          id="birthLocation"
          name="birthLocation"
          defaultValue={birthLocation}
          placeholder="e.g., New York, NY"
          disabled={status === 'loading'}
        />
      </div>

      {message && (
        <p className={status === 'success' ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full"
      >
        {status === 'loading' ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
