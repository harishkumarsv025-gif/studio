'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getRecommendations } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { type PersonalizedLoanRecommendationsOutput } from '@/ai/flows/personalized-loan-recommendations';
import { Badge } from '@/components/ui/badge';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  income: z.coerce.number().min(0, 'Income must be a positive number.'),
  creditScore: z.coerce.number().min(300, 'Credit score must be at least 300.').max(850, 'Credit score must be at most 850.'),
  loanPurpose: z.string().min(3, 'Please specify a loan purpose.'),
  loanAmount: z.coerce.number().min(100, 'Loan amount must be at least $100.'),
});

type FormData = z.infer<typeof formSchema>;

export function PersonalizedRecommendations() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedLoanRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 500,
      creditScore: 580,
      loanPurpose: 'Business startup',
      loanAmount: 1000,
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setResult(null);
    const { data, error } = await getRecommendations(values);
    setLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: error,
      });
    } else {
      setResult(data);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Wand2 className="h-6 w-6 text-primary" />
          AI-Powered Loan Advisor
        </CardTitle>
        <CardDescription>
          Fill in your details to receive personalized loan recommendations from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creditScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Score</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="300-850" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Purpose</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Business startup" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
          </form>
        </Form>

        {loading && (
          <div className="mt-8 text-center text-muted-foreground">
            <p>Our AI is analyzing your profile to find the best options...</p>
          </div>
        )}

        {result && (
          <div className="mt-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-headline">Recommended For You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.recommendations.map((rec, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{rec.loanProduct}</CardTitle>
                      <CardDescription>{rec.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-bold text-primary">{rec.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Term</span>
                        <span className="font-semibold">{rec.maxTerm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fee</span>
                        <span className="font-semibold">{rec.processingFee}</span>
                      </div>
                      <Badge variant="secondary">
                        Suitability: {rec.suitabilityScore}/10
                      </Badge>
                      <p className="text-sm text-muted-foreground pt-2 italic">
                        &quot;{rec.reasoning}&quot;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        Overall Financial Advice
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{result.overallAdvice}</p>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
