import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | From The Ascendant',
  description: 'Get in touch with From The Ascendant. We read every message.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="max-w-article mx-auto px-6 py-16">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Contact</h1>
            <p className="text-stone text-lg">We read every message</p>
          </header>

          <div className="max-w-lg mx-auto">
            <div className="bg-white border border-border rounded-lg p-8 mb-8">
              <h2 className="font-serif text-xl mb-4">General Inquiries</h2>
              <p className="text-stone mb-4">
                For questions, feedback, or just to say hello:
              </p>
              <a 
                href="mailto:hello@fromtheascendant.com" 
                className="text-charcoal hover:underline font-medium"
              >
                hello@fromtheascendant.com
              </a>
            </div>

            <div className="bg-white border border-border rounded-lg p-8 mb-8">
              <h2 className="font-serif text-xl mb-4">Technical Issues</h2>
              <p className="text-stone mb-4">
                Having trouble with your account or the website? Let us know:
              </p>
              <a 
                href="mailto:hello@fromtheascendant.com?subject=Technical Issue" 
                className="text-charcoal hover:underline font-medium"
              >
                hello@fromtheascendant.com
              </a>
            </div>

            <div className="text-center text-stone mt-12">
              <p className="mb-4">
                We typically respond within 48 hours.
              </p>
              <p className="text-sm text-muted">
                Please note: We cannot offer personal astrological consultations 
                or birth chart readings beyond what is provided through our weekly 
                reading service.
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
