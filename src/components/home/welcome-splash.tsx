'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderData from '@/lib/placeholder-images.json';
import { Landmark } from 'lucide-react';

const SPLASH_SEEN_KEY = 'microfin_splash_seen';

const splashImage = placeholderData.placeholderImages.find(
  (img) => img.id === 'splash-background'
);

export function WelcomeSplash({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const splashSeen = sessionStorage.getItem(SPLASH_SEEN_KEY);
    if (!splashSeen) {
      setIsVisible(true);
    } else {
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
      {splashImage && (
         <Image
          src={splashImage.imageUrl}
          alt={splashImage.description}
          fill
          className="object-cover"
          data-ai-hint={splashImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-4">
        <Landmark className="h-16 w-16 text-white drop-shadow-lg mx-auto mb-4" />
        <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-md">
          Welcome to MicroInsurance Ally
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-sm">
          Your trusted partner in securing affordable insurance for a brighter, safer future.
        </p>
        <Button onClick={handleEnter} size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
          Enter Site
        </Button>
      </div>
    </div>
  );
}
