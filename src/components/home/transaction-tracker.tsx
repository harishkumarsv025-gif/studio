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
import { ShieldCheck, ShieldAlert, LineChart } from 'lucide-react';
import { Separator } from '../ui/separator';

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

export function TransactionTracker() {
  const totalIncome = mockTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

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
