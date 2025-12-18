'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '../ui/badge';
import { Calculator } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader } from '../ui/card';

const ratios = [
  {
    id: 'savingsRate',
    name: 'Savings Rate',
    formula: '(Monthly Savings / Monthly Income) x 100',
    description:
      'This shows what percentage of your income you are saving. A higher rate means you are building wealth faster.',
    benchmark: 'Aim for at least 20%.',
    benchmarkColor: 'bg-green-100 text-green-800 border-green-300',
  },
  {
    id: 'dti',
    name: 'Debt-to-Income (DTI) Ratio',
    formula: '(Total Monthly Debt Payments / Monthly Income) x 100',
    description:
      'This measures your ability to manage monthly debt payments. A lower DTI is preferred by lenders.',
    benchmark: 'Below 36% is considered good.',
    benchmarkColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  {
    id: 'dscr',
    name: 'Debt Service Coverage Ratio (DSCR) - Personal',
    formula: 'Monthly Income / Total Monthly Debt Payments',
    description:
      'A personal version of a business metric, this ratio indicates if you have enough income to cover your debts. A ratio above 1 means you have enough.',
    benchmark: 'Aim for 1.25 or higher.',
    benchmarkColor: 'bg-green-100 text-green-800 border-green-300',
  },
  {
    id: 'icr',
    name: 'Interest Coverage Ratio (ICR) - Personal',
    formula: '(Income Before Debt Payments) / Total Monthly Interest Payments',
    description:
      'This shows how easily you can pay the interest on your outstanding debts. A higher number is better.',
    benchmark: 'Aim for 2.0 or higher.',
    benchmarkColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
];

type CalculatedRatios = {
  savingsRate: number | null;
  dti: number | null;
  dscr: number | null;
  icr: number | null;
};

export function FinancialRatios() {
  const [monthlyIncome, setMonthlyIncome] = useState(10000);
  const [monthlySavings, setMonthlySavings] = useState(2000);
  const [monthlyDebt, setMonthlyDebt] = useState(1000);
  const [monthlyInterest, setMonthlyInterest] = useState(300);

  const calculatedRatios: CalculatedRatios = {
    savingsRate: monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : null,
    dti: monthlyIncome > 0 ? (monthlyDebt / monthlyIncome) * 100 : null,
    dscr: monthlyDebt > 0 ? monthlyIncome / monthlyDebt : null,
    icr: monthlyInterest > 0 ? monthlyIncome / monthlyInterest : null,
  };

  const formatResult = (value: number | null, unit: string = '') => {
    if (value === null || !isFinite(value)) {
      return <span className="text-muted-foreground">N/A</span>;
    }
    return (
      <span className="text-primary font-bold">
        {value.toFixed(2)}
        {unit}
      </span>
    );
  };
  

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-headline flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          Key Financial Ratios
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Understand these key metrics to gauge your financial health and make smarter decisions.
        </p>
      </div>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <h3 className="text-xl font-semibold font-headline">Your Financial Snapshot</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="income">Monthly Income (INR)</Label>
            <Input
              id="income"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              placeholder="e.g., 10000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="savings">Monthly Savings (INR)</Label>
            <Input
              id="savings"
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
              placeholder="e.g., 2000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="debt">Monthly Debt Payments (INR)</Label>
            <Input
              id="debt"
              type="number"
              value={monthlyDebt}
              onChange={(e) => setMonthlyDebt(Number(e.target.value))}
              placeholder="e.g., 1000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest">Monthly Interest (INR)</Label>
            <Input
              id="interest"
              type="number"
              value={monthlyInterest}
              onChange={(e) => setMonthlyInterest(Number(e.target.value))}
              placeholder="e.g., 300"
            />
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {ratios.map((ratio) => (
          <AccordionItem key={ratio.name} value={ratio.name}>
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex justify-between items-center w-full pr-4">
                <span>{ratio.name}</span>
                <span className="text-lg font-mono">
                  {formatResult(calculatedRatios[ratio.id as keyof CalculatedRatios], ratio.id === 'savingsRate' || ratio.id === 'dti' ? '%' : '')}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <p className="text-muted-foreground">{ratio.description}</p>
              <div>
                <p className="font-mono text-sm bg-muted p-2 rounded-md inline-block">
                  {ratio.formula}
                </p>
              </div>
              <Badge variant="secondary" className={ratio.benchmarkColor}>
                {ratio.benchmark}
              </Badge>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
