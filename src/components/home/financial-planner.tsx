'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getFinancialPlan } from '@/app/actions';

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
import { BrainCircuit, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { type StudentFinancialPlannerOutput } from '@/ai/flows/student-financial-planner';
import { Badge } from '@/components/ui/badge';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  monthlyIncome: z.coerce.number().min(0, 'Income must be a positive number.'),
  monthlyExpenses: z.coerce.number().min(0, 'Expenses must be a positive number.'),
  savingsGoal: z.string().min(3, 'Please describe your savings goal.'),
  timeframe: z.string().min(1, 'Please select a timeframe.'),
});

type FormData = z.infer<typeof formSchema>;

export function FinancialPlanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StudentFinancialPlannerOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: 10000,
      monthlyExpenses: 6000,
      savingsGoal: 'A new laptop for studies',
      timeframe: '6 months',
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setResult(null);
    const { data, error } = await getFinancialPlan(values);
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
          <BrainCircuit className="h-6 w-6 text-primary" />
          AI Financial Planner
        </CardTitle>
        <CardDescription>
          Get a personalized financial plan from our AI to help you achieve your goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Expenses (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 6000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="savingsGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Savings Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New laptop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Timeframe</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3 months">3 Months</SelectItem>
                          <SelectItem value="6 months">6 Months</SelectItem>
                          <SelectItem value="1 year">1 Year</SelectItem>
                          <SelectItem value="2 years">2 Years</SelectItem>
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
                  Generating Plan...
                </>
              ) : (
                'Get My Financial Plan'
              )}
            </Button>
          </form>
        </Form>

        {loading && (
          <div className="mt-8 text-center text-muted-foreground">
            <p>Our AI is crunching the numbers to build your personalized plan...</p>
          </div>
        )}

        {result && (
          <div className="mt-10 space-y-8">
            <div className="space-y-6">
                <Card className="bg-secondary/50">
                    <CardContent className="p-6">
                        <p className="text-center text-lg text-muted-foreground">
                            {result.progressSummary} To reach your goal, your target is:
                        </p>
                        <p className="text-center text-4xl font-bold text-primary font-headline mt-2">
                            ₹{result.monthlySavingsTarget.toLocaleString('en-IN')} / month
                        </p>
                    </CardContent>
                </Card>

              <h3 className="text-xl font-bold font-headline">Your Actionable Advice</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.actionableAdvice.map((tip, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{tip.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">{tip.advice}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
