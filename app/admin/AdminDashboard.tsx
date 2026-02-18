'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CronLog {
  id: string;
  type: string;
  status: string;
  message: string | null;
  createdAt: Date;
}

interface AdminDashboardProps {
  stats: {
    userCount: number;
    contentCount: number;
    readingCount: number;
  };
  cronLogs: CronLog[];
}

export default function AdminDashboard({ stats, cronLogs }: AdminDashboardProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function triggerCron(endpoint: string) {
    setLoading(endpoint);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/${endpoint}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${JSON.stringify(data.results || data)}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage('Error: Failed to trigger action');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-border bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-serif text-2xl">Admin Dashboard</h1>
          <Link href="/" className="text-sm text-muted hover:text-charcoal">
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Stats */}
        <section className="mb-12">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border border-border p-6">
              <p className="text-3xl font-serif">{stats.userCount}</p>
              <p className="text-sm text-muted mt-1">Users</p>
            </div>
            <div className="bg-white border border-border p-6">
              <p className="text-3xl font-serif">{stats.contentCount}</p>
              <p className="text-sm text-muted mt-1">Generated Content</p>
            </div>
            <div className="bg-white border border-border p-6">
              <p className="text-3xl font-serif">{stats.readingCount}</p>
              <p className="text-sm text-muted mt-1">Weekly Readings</p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="mb-12">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted mb-4">
            Actions
          </h2>
          <div className="bg-white border border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Regenerate Events</p>
                <p className="text-sm text-muted">
                  Pre-generate moon event content for the next 7 days
                </p>
              </div>
              <button
                onClick={() => triggerCron('generate-events')}
                disabled={loading !== null}
                className="btn-secondary"
              >
                {loading === 'generate-events' ? 'Running...' : 'Run'}
              </button>
            </div>
            <hr className="border-border" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Send Weekly Readings</p>
                <p className="text-sm text-muted">
                  Generate and email weekly readings to all users
                </p>
              </div>
              <button
                onClick={() => triggerCron('weekly-readings')}
                disabled={loading !== null}
                className="btn-secondary"
              >
                {loading === 'weekly-readings' ? 'Running...' : 'Run'}
              </button>
            </div>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-white border border-border text-sm">
              <pre className="whitespace-pre-wrap">{message}</pre>
            </div>
          )}
        </section>

        {/* Cron Logs */}
        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted mb-4">
            Recent Cron Runs
          </h2>
          <div className="bg-white border border-border">
            {cronLogs.length === 0 ? (
              <p className="p-6 text-muted">No cron runs yet.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted">
                    <th className="p-4">Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Time</th>
                    <th className="p-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {cronLogs.map((log) => (
                    <tr key={log.id} className="border-b border-border last:border-b-0">
                      <td className="p-4 font-mono text-sm">{log.type}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs ${
                            log.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : log.status === 'error'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4 text-sm text-muted max-w-xs truncate">
                        {log.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Logout */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/admin/logout"
            className="text-red-600 text-sm hover:underline"
          >
            Logout
          </Link>
        </div>
      </main>
    </div>
  );
}
