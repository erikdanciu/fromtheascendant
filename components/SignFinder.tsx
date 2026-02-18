'use client';

import { useState } from 'react';
import Link from 'next/link';

const ZODIAC_DATES = [
  { sign: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19], element: 'Fire' },
  { sign: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20], element: 'Earth' },
  { sign: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20], element: 'Air' },
  { sign: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22], element: 'Water' },
  { sign: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22], element: 'Fire' },
  { sign: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22], element: 'Earth' },
  { sign: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22], element: 'Air' },
  { sign: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21], element: 'Water' },
  { sign: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21], element: 'Fire' },
  { sign: 'Capricorn', symbol: '♑', start: [12, 22], end: [1, 19], element: 'Earth' },
  { sign: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18], element: 'Air' },
  { sign: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20], element: 'Water' },
];

function getSignFromDate(month: number, day: number) {
  for (const zodiac of ZODIAC_DATES) {
    const [startMonth, startDay] = zodiac.start;
    const [endMonth, endDay] = zodiac.end;
    
    // Handle Capricorn which spans year boundary
    if (startMonth > endMonth) {
      if ((month === startMonth && day >= startDay) || 
          (month === endMonth && day <= endDay) ||
          month > startMonth || month < endMonth) {
        return zodiac;
      }
    } else {
      if ((month === startMonth && day >= startDay) ||
          (month === endMonth && day <= endDay) ||
          (month > startMonth && month < endMonth)) {
        return zodiac;
      }
    }
  }
  return ZODIAC_DATES[0]; // Default to Aries
}

export default function SignFinder() {
  const [month, setMonth] = useState<number | ''>('');
  const [day, setDay] = useState<number | ''>('');
  const [result, setResult] = useState<typeof ZODIAC_DATES[0] | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (month && day) {
      const sign = getSignFromDate(month, day);
      setResult(sign);
    }
  };

  const getDaysInMonth = (m: number) => {
    if (!m) return 31;
    const daysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[m - 1];
  };

  return (
    <div className="max-w-lg mx-auto">
      {!result ? (
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-8">
          <h2 className="font-serif text-2xl mb-6 text-center">Enter Your Birthday</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="month" className="block text-sm text-muted mb-2">Month</label>
              <select
                id="month"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value ? parseInt(e.target.value) : '');
                  setDay('');
                }}
                className="w-full px-4 py-3 rounded-lg border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                required
              >
                <option value="">Select...</option>
                {months.map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="day" className="block text-sm text-muted mb-2">Day</label>
              <select
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-4 py-3 rounded-lg border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                required
                disabled={!month}
              >
                <option value="">Select...</option>
                {Array.from({ length: getDaysInMonth(month as number) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-charcoal text-cream py-3 rounded-lg hover:bg-charcoal/90 transition-colors"
          >
            Find My Sign
          </button>
        </form>
      ) : (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">{result.symbol}</div>
          <h2 className="font-serif text-3xl mb-2">You are a {result.sign}</h2>
          <p className="text-muted mb-6">{result.element} Sign</p>
          
          <Link
            href={`/signs/${result.sign.toLowerCase()}`}
            className="inline-block bg-charcoal text-cream px-6 py-3 rounded-lg hover:bg-charcoal/90 transition-colors mb-4"
          >
            Read About {result.sign}
          </Link>
          
          <button
            onClick={() => {
              setResult(null);
              setMonth('');
              setDay('');
            }}
            className="block w-full text-muted hover:text-charcoal transition-colors text-sm mt-4"
          >
            Try another date
          </button>
        </div>
      )}
    </div>
  );
}
