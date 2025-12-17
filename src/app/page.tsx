'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Hero } from '@/components/home/hero';
import { InsuranceCalculator } from '@/components/home/insurance-calculator';
import { InsurerComparison } from '@/components/home/provider-comparison';
import { PolicyAdvisor } from '@/components/home/personalized-recommendations';
import { Support } from '@/components/home/support';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { WelcomeSplash } from '@/components/home/welcome-splash';

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleSplashEnter = () => {
    setShowMainContent(true);
  };

  return (
    <>
      <WelcomeSplash onEnter={handleSplashEnter} />
      {showMainContent && (
        <div className="flex flex-col min-h-screen animate-in fade-in-50">
          <Header />
          <main className="flex-grow">
            <Hero />
            <div className="container mx-auto px-4 py-12 md:py-16 space-y-20 md:space-y-28">
              <section id="calculator" className="scroll-mt-20">
                <InsuranceCalculator />
              </section>
              <section id="advisor" className="scroll-mt-20">
                <PolicyAdvisor />
              </section>
              <section id="compare" className="scroll-mt-20">
                <InsurerComparison />
              </section>
              <section id="support" className="scroll-mt-20">
                <Support />
              </section>
            </div>
          </main>
          <CookieBanner />
        </div>
      )}
    </>
  );
}
