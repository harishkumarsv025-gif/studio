'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Landmark } from 'lucide-react';

const SPLASH_SEEN_KEY = 'microfin_splash_seen';

export function WelcomeSplash({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use sessionStorage to only show splash once per session
    const splashSeen = sessionStorage.getItem(SPLASH_SEEN_KEY);
    if (!splashSeen) {
      setIsVisible(true);
    } else {
      // If already seen in this session, immediately call onEnter
      onEnter();
    }
  }, [onEnter]);

  const handleEnter = () => {
    sessionStorage.setItem(SPLASH_SEEN_KEY, 'true');
    setIsVisible(false);
    onEnter();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background animate-in fade-in-50">
      <div className="text-center">
        <Landmark className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Welcome to MicroInsurance Ally
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your trusted partner in securing affordable insurance for a brighter future.
        </p>
        <Button onClick={handleEnter} size="lg" className="mt-8 bg-primary hover:bg-primary/90">
          Enter Site
        </Button>
      </div>
    </div>
  );
}
