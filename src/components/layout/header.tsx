import Link from 'next/link';
import { Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const navLinks = [
    { href: '#calculator', label: 'Calculator' },
    { href: '#advisor', label: 'AI Advisor' },
    { href: '#compare', label: 'Compare' },
    { href: '#support', label: 'Support' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">MicroFinance Ally</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
