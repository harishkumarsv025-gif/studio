import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '../ui/badge';
import { Calculator } from 'lucide-react';

const ratios = [
  {
    name: 'Savings Rate',
    formula: '(Monthly Savings / Monthly Income) x 100',
    description: 'This shows what percentage of your income you are saving. A higher rate means you are building wealth faster.',
    benchmark: 'Aim for at least 20%.',
    benchmarkColor: 'bg-green-100 text-green-800 border-green-300',
  },
  {
    name: 'Debt-to-Income (DTI) Ratio',
    formula: '(Total Monthly Debt Payments / Monthly Income) x 100',
    description: 'This measures your ability to manage monthly debt payments. A lower DTI is preferred by lenders.',
    benchmark: 'Below 36% is considered good.',
    benchmarkColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  {
    name: 'Debt Service Coverage Ratio (DSCR) - Personal',
    formula: 'Monthly Income / Total Monthly Debt Payments',
    description: 'A personal version of a business metric, this ratio indicates if you have enough income to cover your debts. A ratio above 1 means you have enough.',
    benchmark: 'Aim for 1.25 or higher.',
    benchmarkColor: 'bg-green-100 text-green-800 border-green-300',
  },
  {
    name: 'Interest Coverage Ratio (ICR) - Personal',
    formula: '(Income Before Debt Payments) / Total Monthly Interest Payments',
    description: 'This shows how easily you can pay the interest on your outstanding debts. A higher number is better.',
    benchmark: 'Aim for 2.0 or higher.',
    benchmarkColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
];

export function FinancialRatios() {
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
      <Accordion type="single" collapsible className="w-full">
        {ratios.map((ratio) => (
          <AccordionItem key={ratio.name} value={ratio.name}>
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              {ratio.name}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <p className="text-muted-foreground">{ratio.description}</p>
              <div>
                <p className="font-mono text-sm bg-muted p-2 rounded-md inline-block">{ratio.formula}</p>
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
