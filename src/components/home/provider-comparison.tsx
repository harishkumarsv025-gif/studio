import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Scale } from 'lucide-react';

const providers = [
  {
    name: 'Provider A',
    product: 'MicroStart',
    interestRate: '4.5%',
    maxTerm: '12 Months',
    processingFee: '$10',
  },
  {
    name: 'Provider B',
    product: 'QuickLoan',
    interestRate: '5.2%',
    maxTerm: '24 Months',
    processingFee: 'Free',
  },
  {
    name: 'Provider C',
    product: 'ExpressCredit',
    interestRate: '6.0%',
    maxTerm: '18 Months',
    processingFee: '$5',
  },
];

export function ProviderComparison() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Scale className="h-6 w-6 text-primary" />
          Compare Microfinance Providers
        </CardTitle>
        <CardDescription>
          A quick overview of available loan products. For personalized advice, use our AI Advisor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Provider</TableHead>
                <TableHead className="font-semibold">Loan Product</TableHead>
                <TableHead className="font-semibold text-center">Interest Rate</TableHead>
                <TableHead className="font-semibold text-center">Max Term</TableHead>
                <TableHead className="font-semibold text-center">Processing Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.name}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>{provider.product}</TableCell>
                  <TableCell className="text-center">{provider.interestRate}</TableCell>
                  <TableCell className="text-center">{provider.maxTerm}</TableCell>
                  <TableCell className="text-center">{provider.processingFee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
