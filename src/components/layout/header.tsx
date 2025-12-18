import Link from 'next/link';
import { BrainCircuit, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AuthButton } from '@/components/auth/auth-button';
import { PsyCoin } from '../auth/psy-coin';

export const navLinks = [
    { href: '/#tracker', label: 'Tracker' },
    { href: '/#calculator', label: 'Calculator' },
    { href: '/#planner', label: 'AI Planner' },
    { href: '/#ratios', label: 'Ratios' },
    { href: '/#consultancy', label: 'Services' },
    { href: '/#support', label: 'Support' },
];


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Sheet>
            <SheetTrigger asChild>
                <button className="mr-2 flex items-center space-x-2">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">PSYCEMONEY</span>
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                 <Link href="/" className="mr-6 flex items-center space-x-2">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">PSYCEMONEY</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                        >
                        {link.label}
                        </Link>
                    ))}
                    </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <PsyCoin />
            <Button variant="ghost" size="icon" asChild>
                <Link href="/#support">
                    <LifeBuoy className="h-5 w-5" />
                    <span className="sr-only">Support</span>
                </Link>
            </Button>
            <AuthButton />
        </div>
      </div>
    </header>
  );
}
