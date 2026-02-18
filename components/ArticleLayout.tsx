import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailSignupForm from '@/components/EmailSignupForm';

interface ArticleLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showSignup?: boolean;
}

export default function ArticleLayout({ 
  title, 
  subtitle, 
  children,
  showSignup = true 
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="py-16 px-6">
          <div className="max-w-article mx-auto">
            <header className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-stone text-lg">{subtitle}</p>
              )}
            </header>

            <div className="article-content prose">
              {children}
            </div>
          </div>
        </article>

        {showSignup && (
          <section className="py-16 px-6 border-t border-border bg-white">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="font-serif text-2xl mb-4">
                Receive weekly personal readings
              </h2>
              <p className="text-stone mb-8">
                Based on your birth chart and the current lunar cycle.
              </p>
              <EmailSignupForm buttonText="Get your weekly reading" />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
