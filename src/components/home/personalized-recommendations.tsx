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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { type PersonalizedLoanRecommendationsOutput } from '@/ai/flows/personalized-loan-recommendations';
import { Badge } from '@/components/ui/badge';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Link from 'next/link';

const formSchema = z.object({
  householdSize: z.coerce.number().min(1, 'Household must have at least 1 member.'),
  monthlyIncome: z.coerce.number().min(0, 'Income must be a positive number.'),
  loanAmount: z.coerce.number().min(1000, 'Loan amount must be at least ₹1,000.'),
  loanPurpose: z.string().min(1, 'Please select a loan purpose.'),
});

type FormData = z.infer<typeof formSchema>;

export function PolicyAdvisor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedLoanRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdSize: 4,
      monthlyIncome: 15000,
      loanAmount: 50000,
      loanPurpose: 'Business',
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
                name="householdSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Household Size</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 15000" {...field} />
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
                    <FormLabel>Loan Amount (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
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
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan purpose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                          <SelectItem value="Home Improvement">Home Improvement</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
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
            <p>Our AI is analyzing your profile to find the best loans for you...</p>
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
                      <CardTitle className="text-lg">{rec.productName}</CardTitle>
                      <CardDescription>{rec.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-bold text-primary">{rec.interestRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tenure</span>
                        <span className="font-semibold">{rec.tenure}</span>
                      </div>
                       <p className="text-sm pt-2">
                        <span className='font-semibold'>Details: </span>{rec.loanDetails}
                      </p>
                      <Badge variant="secondary">
                        Suitability: {rec.suitabilityScore}/10
                      </Badge>
                      <p className="text-sm text-muted-foreground pt-2 italic">
                        &quot;{rec.reasoning}&quot;
                      </p>
                    </CardContent>
                     <CardFooter>
                        <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90">
                            <Link href={`/apply?lender=${encodeURIComponent(rec.provider)}&product=${encodeURIComponent(rec.productName)}`}>
                                Apply Now
                            </Link>
                        </Button>
                    </CardFooter>
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
