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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator } from 'lucide-react';

export function LoanCalculator() {
  const [amount, setAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(5);
  const [term, setTerm] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(amount.toString());
    const annualRate = parseFloat(interestRate.toString());
    const loanTermMonths = parseInt(term.toString(), 10);

    if (principal > 0 && annualRate > 0 && loanTermMonths > 0) {
      const monthlyRate = annualRate / 100 / 12;
      const payment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -loanTermMonths));
      setMonthlyPayment(payment.toFixed(2));
    } else {
      setMonthlyPayment(null);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Calculator className="h-6 w-6 text-primary" />
          Simple Loan Calculator
        </CardTitle>
        <CardDescription>
          Estimate your monthly loan payments. Adjust the sliders or enter values to start.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <Label htmlFor="amount">Loan Amount: ${amount.toLocaleString()}</Label>
            <Slider
              id="amount"
              min={500}
              max={50000}
              step={500}
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate: {interestRate.toFixed(1)}%</Label>
            <Slider
              id="rate"
              min={1}
              max={25}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="term">Term: {term} months</Label>
          <Slider
            id="term"
            min={6}
            max={72}
            step={1}
            value={[term]}
            onValueChange={(value) => setTerm(value[0])}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={calculateLoan} className="bg-primary hover:bg-primary/90">
          Calculate Monthly Payment
        </Button>
        {monthlyPayment && (
          <div className="text-xl font-bold font-headline text-primary-dark">
            Estimated Monthly Payment:{' '}
            <span className="text-2xl text-primary">${monthlyPayment}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
