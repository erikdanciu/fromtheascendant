import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'From The Ascendant',
  description: 'A calm astrology publication offering reflective weekly readings based on lunar cycles.',
  keywords: ['astrology', 'moon phases', 'weekly reading', 'horoscope', 'natal chart', 'rising sign'],
  authors: [{ name: 'From The Ascendant' }],
  openGraph: {
    title: 'From The Ascendant',
    description: 'A calm astrology publication offering reflective weekly readings based on lunar cycles.',
    type: 'website',
    locale: 'en_US',
    siteName: 'From The Ascendant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From The Ascendant',
    description: 'A calm astrology publication offering reflective weekly readings based on lunar cycles.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
