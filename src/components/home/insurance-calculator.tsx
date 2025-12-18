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
import { Banknote } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function InsuranceCalculator() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(24);
  const [monthlyEMI, setMonthlyEMI] = useState<string | null>(null);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const months = tenure;
    
    if (rate === 0) {
      setMonthlyEMI((principal / months).toFixed(2));
      return;
    }

    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    setMonthlyEMI(emi.toFixed(2));
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Banknote className="h-6 w-6 text-primary" />
          Loan EMI Calculator
        </CardTitle>
        <CardDescription>
          Estimate your monthly loan payment (EMI). Adjust the sliders to see how it changes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="amount">Loan Amount: ₹{loanAmount.toLocaleString('en-IN')}</Label>
            <Slider
              id="amount"
              min={10000}
              max={500000}
              step={1000}
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <Label htmlFor="interest">Interest Rate (% p.a.): {interestRate}%</Label>
            <Slider
              id="interest"
              min={5}
              max={25}
              step={0.5}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenure">Loan Tenure (Months): {tenure}</Label>
            <Slider
              id="tenure"
              min={6}
              max={60}
              step={1}
              value={[tenure]}
              onValueChange={(value) => setTenure(value[0])}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={calculateEMI} className="bg-primary hover:bg-primary/90">
          Calculate Monthly EMI
        </Button>
        {monthlyEMI && (
          <div className="text-xl font-bold font-headline text-primary-dark">
            Estimated Monthly EMI:{' '}
            <span className="text-2xl text-primary">₹{monthlyEMI}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
