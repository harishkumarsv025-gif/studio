'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ShieldAlert, LineChart, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';

const mockTransactions = [
  {
    id: 1,
    description: 'Zomato Order',
    amount: -250.00,
    date: '2024-10-26',
    status: 'Verified',
  },
  {
    id: 2,
    description: 'Part-time Job Salary',
    amount: 5000.00,
    date: '2024-10-25',
    status: 'Verified',
  },
  {
    id: 3,
    description: 'Bookstore Purchase',
    amount: -800.00,
    date: '2024-10-24',
    status: 'Verified',
  },
  {
    id: 4,
    description: 'Unknown UPI to "gamerz-store.com"',
    amount: -3500.00,
    date: '2024-10-23',
    status: 'Flagged',
  },
    {
    id: 5,
    description: 'Mobile Recharge',
    amount: -299.00,
    date: '2024-10-22',
    status: 'Verified',
  },
];

const HealthStatus = ({ score }: { score: number }) => {
    let status = '';
    let Icon = AlertCircle;
    let color = 'text-red-500';

    if (score >= 75) {
        status = 'Good';
        Icon = TrendingUp;
        color = 'text-green-500';
    } else if (score >= 50) {
        status = 'Better';
        Icon = CheckCircle;
        color = 'text-blue-500';
    } else if (score >= 25) {
        status = 'Could be Better';
        Icon = TrendingDown;
        color = 'text-yellow-500';
    } else {
        status = 'Needs Attention';
        Icon = AlertCircle;
        color = 'text-red-500';
    }

    return (
        <div className={`flex flex-col items-center justify-center text-center ${color}`}>
            <Icon className="h-10 w-10 mb-2" />
            <span className="font-bold text-lg">{status}</span>
        </div>
    );
};

export function TransactionTracker() {
  const totalIncome = mockTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalIncome + totalExpenses;

  // Calculate health score. Let's define it based on savings rate.
  // A savings rate of 50% or more is 100. Below 0% is 0.
  const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;
  const healthScore = Math.max(0, Math.min(100, savingsRate * 2));


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <LineChart className="h-6 w-6 text-primary" />
          Real-Time Transaction Tracker
        </CardTitle>
        <CardDescription>
          Keep an eye on your spending and get instant alerts for suspicious activity to prevent fraud.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="mb-6 bg-muted/50">
            <CardHeader>
                <CardTitle className="text-xl text-center font-headline">Your Financial Health Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-around gap-6">
                 <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                        className="text-border"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.p155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        />
                        <path
                        className="text-primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${healthScore}, 100`}
                        strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary">{Math.round(healthScore)}</span>
                    </div>
                </div>
                <HealthStatus score={healthScore} />
            </CardContent>
        </Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right text-green-600">Income (INR)</TableHead>
              <TableHead className="text-right text-red-600">Expense (INR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  {transaction.status === 'Verified' ? (
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                      <ShieldCheck className="h-3 w-3 text-green-500" />
                      <span>Verified</span>
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                      <ShieldAlert className="h-3 w-3" />
                      <span>Flagged</span>
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  {transaction.amount > 0 ? transaction.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }) : '-'}
                </TableCell>
                <TableCell className="text-right font-medium text-red-600">
                  {transaction.amount < 0 ? Math.abs(transaction.amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }) : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Separator className="my-2" />
        <div className="w-full space-y-2">
            <h4 className="text-lg font-semibold font-headline">Monthly Statement</h4>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Income:</span>
                <span className="font-bold text-green-600">{totalIncome.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Expenses:</span>
                <span className="font-bold text-red-600">{Math.abs(totalExpenses).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
                <span className="font-bold">Net Balance:</span>
                <span className={`font-bold ${(totalIncome + totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(totalIncome + totalExpenses).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </span>
            </div>
        </div>
        <Separator className="my-2" />
        <p className="text-sm text-muted-foreground pt-4">
            Ready to secure your finances? Link your bank account to get started.
        </p>
        <Button disabled>
          Link Bank Account (Coming Soon)
        </Button>
      </CardFooter>
    </Card>
  );
}
