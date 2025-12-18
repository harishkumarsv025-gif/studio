'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Target } from 'lucide-react';
import { Input } from '../ui/input';

export function SavingsCalculator() {
  const [savingsGoal, setSavingsGoal] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(2000);
  const [timeToGoal, setTimeToGoal] = useState<string | null>(null);

  const calculateTimeToGoal = () => {
    if (monthlyContribution <= 0) {
      setTimeToGoal('Please enter a valid monthly contribution.');
      return;
    }
    const months = Math.ceil(savingsGoal / monthlyContribution);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let result = '';
    if (years > 0) {
      result += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (remainingMonths > 0) {
      if (years > 0) result += ' and ';
      result += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
    setTimeToGoal(result);
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Target className="h-6 w-6 text-primary" />
          Savings Goal Calculator
        </CardTitle>
        <CardDescription>
          Estimate how long it will take to reach your savings goal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="goal">Savings Goal: ₹{savingsGoal.toLocaleString('en-IN')}</Label>
            <Slider
              id="goal"
              min={1000}
              max={200000}
              step={1000}
              value={[savingsGoal]}
              onValueChange={(value) => setSavingsGoal(value[0])}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="contribution">Monthly Contribution: ₹{monthlyContribution.toLocaleString('en-IN')}</Label>
            <Slider
              id="contribution"
              min={500}
              max={20000}
              step={100}
              value={[monthlyContribution]}
              onValueChange={(value) => setMonthlyContribution(value[0])}
            />
          </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={calculateTimeToGoal} className="bg-primary hover:bg-primary/90">
          Calculate Time to Goal
        </Button>
        {timeToGoal && (
          <div className="text-xl font-bold font-headline text-primary-dark">
            Time to reach your goal:{' '}
            <span className="text-2xl text-primary">{timeToGoal}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
