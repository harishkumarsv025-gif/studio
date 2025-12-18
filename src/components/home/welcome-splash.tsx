'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderData from '@/lib/placeholder-images.json';
import { Landmark } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const SPLASH_SEEN_KEY = 'easycredit_splash_seen';

const splashImage = placeholderData.placeholderImages.find(
  (img) => img.id === 'splash-background'
);

export function WelcomeSplash({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const splashSeen = sessionStorage.getItem(SPLASH_SEEN_KEY);
    if (!splashSeen) {
      setIsVisible(true);
    } else {
      onEnter();
    }
  }, [onEnter]);

  const handleEnter = () => {
    if (termsAccepted) {
      sessionStorage.setItem(SPLASH_SEEN_KEY, 'true');
      setIsVisible(false);
      onEnter();
    }
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
          Welcome to EasyCredit
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-sm">
          Your trusted partner in securing affordable credit for a brighter, safer future.
        </p>
        <div className="mt-8 flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} className='border-white' />
            <Label htmlFor="terms" className="text-sm text-slate-200">
                I agree to the <a href="/terms" target="_blank" className="underline hover:text-white">Terms and Conditions</a>
            </Label>
        </div>
        <Button onClick={handleEnter} size="lg" disabled={!termsAccepted} className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed">
          Enter Site
        </Button>
      </div>
    </div>
  );
}
