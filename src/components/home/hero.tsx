import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const heroImage = placeholderData.placeholderImages.find(
  (img) => img.id === 'hero-image'
);

export function Hero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">
          Master Your Money, Ace Your Future
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-200 drop-shadow-md">
          Smart financial planning and advice, built for students.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#planner">Get AI Plan</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#calculator">Savings Calculator</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
