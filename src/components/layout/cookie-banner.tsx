'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'microfin_cookie_consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary text-secondary-foreground p-4 shadow-2xl-top z-50 animate-in slide-in-from-bottom-5">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Cookie className="h-5 w-5 text-primary shrink-0" />
          <p>We use cookies to ensure you get the best financial advice.</p>
        </div>
        <Button onClick={acceptCookies} className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
          Accept
        </Button>
      </div>
    </div>
  );
}
