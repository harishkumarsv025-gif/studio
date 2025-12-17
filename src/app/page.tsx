import { Header } from '@/components/layout/header';
import { Hero } from '@/components/home/hero';
import { LoanCalculator } from '@/components/home/loan-calculator';
import { ProviderComparison } from '@/components/home/provider-comparison';
import { PersonalizedRecommendations } from '@/components/home/personalized-recommendations';
import { Support } from '@/components/home/support';
import { CookieBanner } from '@/components/layout/cookie-banner';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-24">
          <section id="calculator">
            <LoanCalculator />
          </section>
          <section id="advisor">
            <PersonalizedRecommendations />
          </section>
          <section id="compare">
            <ProviderComparison />
          </section>
          <section id="support">
            <Support />
          </section>
        </div>
      </main>
      <CookieBanner />
    </div>
  );
}
