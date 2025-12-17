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
import { type PersonalizedInsuranceRecommendationsOutput } from '@/ai/flows/personalized-insurance-recommendations';
import { Badge } from '@/components/ui/badge';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Link from 'next/link';

const formSchema = z.object({
  householdSize: z.coerce.number().min(1, 'Household must have at least 1 member.'),
  monthlyIncome: z.coerce.number().min(0, 'Income must be a positive number.'),
  assetsValue: z.coerce.number().min(0, 'Assets value must be a positive number.'),
  coverageType: z.string().min(1, 'Please select a coverage type.'),
});

type FormData = z.infer<typeof formSchema>;

export function PolicyAdvisor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedInsuranceRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdSize: 4,
      monthlyIncome: 15000,
      assetsValue: 50000,
      coverageType: 'Health',
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
          AI-Powered Policy Advisor
        </CardTitle>
        <CardDescription>
          Fill in your details to receive personalized insurance recommendations from our AI.
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
                name="assetsValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assets Value (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Coverage</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select coverage type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Crop">Crop</SelectItem>
                          <SelectItem value="Livestock">Livestock</SelectItem>
                          <SelectItem value="Property">Property</SelectItem>
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
            <p>Our AI is analyzing your profile to find the best policies for you...</p>
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
                      <CardTitle className="text-lg">{rec.policyName}</CardTitle>
                      <CardDescription>{rec.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Monthly Premium</span>
                        <span className="font-bold text-primary">₹{rec.monthlyPremium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deductible</span>
                        <span className="font-semibold">{rec.deductible}</span>
                      </div>
                       <p className="text-sm pt-2">
                        <span className='font-semibold'>Coverage: </span>{rec.coverageDetails}
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
                            <Link href={`/apply?insurer=${encodeURIComponent(rec.provider)}&policy=${encodeURIComponent(rec.policyName)}`}>
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
