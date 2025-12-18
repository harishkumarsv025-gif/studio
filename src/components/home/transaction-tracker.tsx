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
              <TableHead className="text-right">Amount (INR)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell className={`text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
          <p className="text-sm text-muted-foreground">
              Ready to secure your finances? Link your bank account to get started.
          </p>
        <Button disabled>
          Link Bank Account (Coming Soon)
        </Button>
      </CardFooter>
    </Card>
  );
}
