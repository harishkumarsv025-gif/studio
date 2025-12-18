import { Button } from '@/components/ui/button';
import { LifeBuoy, MessageSquare } from 'lucide-react';

export function Support() {
  return (
    <div className="bg-card p-8 rounded-lg shadow-lg border border-accent/50 text-center max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold font-headline text-primary">Need Help?</h3>
      <p className="mt-2 mb-6 text-muted-foreground">
        Our support team is here to help you with any questions about financial planning.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <MessageSquare className="mr-2 h-4 w-4" /> Chat with an Advisor
        </Button>
        <Button size="lg" variant="outline">
          <LifeBuoy className="mr-2 h-4 w-4" /> Visit Help Center
        </Button>
      </div>
    </div>
  );
}
