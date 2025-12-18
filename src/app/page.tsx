'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Hero } from '@/components/home/hero';
import { SavingsCalculator } from '@/components/home/savings-calculator';
import { Consultancy } from '@/components/home/consultancy-services';
import { FinancialPlanner } from '@/components/home/financial-planner';
import { Support } from '@/components/home/support';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { WelcomeSplash } from '@/components/home/welcome-splash';
import { TransactionTracker } from '@/components/home/transaction-tracker';
import { FinancialRatios } from '@/components/home/financial-ratios';
import { PricingPlans } from '@/components/home/pricing-plans';

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
          <main className="flex-1">
            <Hero />
            <div className="container mx-auto px-4 py-12 md:py-16 space-y-20 md:space-y-28">
              <section id="tracker" className="scroll-mt-20">
                <TransactionTracker />
              </section>
              <section id="calculator" className="scroll-mt-20">
                <SavingsCalculator />
              </section>
              <section id="planner" className="scroll-mt-20">
                <FinancialPlanner />
              </section>
              <section id="ratios" className="scroll-mt-20">
                <FinancialRatios />
              </section>
              <section id="consultancy" className="scroll-mt-20">
                <Consultancy />
                <PricingPlans />
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
