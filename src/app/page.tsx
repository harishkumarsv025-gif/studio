import { Header } from '@/components/layout/header';
import { Hero } from '@/components/home/hero';
import { InsuranceCalculator } from '@/components/home/insurance-calculator';
import { InsurerComparison } from '@/components/home/provider-comparison';
import { PolicyAdvisor } from '@/components/home/personalized-recommendations';
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
            <InsuranceCalculator />
          </section>
          <section id="advisor">
            <PolicyAdvisor />
          </section>
          <section id="compare">
            <InsurerComparison />
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
