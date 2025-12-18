import Image from 'next/image';
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
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';

const lenders = [
  {
    name: 'State Bank of India',
    logo: 'https://placehold.co/100x40/004d98/ffffff?text=SBI',
    product: 'Mudra Loan',
    interestRate: '9.75% p.a. onwards',
    maxAmount: 'Up to ₹10 Lakh',
    bestFor: 'Small Business',
  },
  {
    name: 'HDFC Bank',
    logo: 'https://placehold.co/100x40/ffffff/c40000?text=HDFC+Bank',
    product: 'Personal Loan',
    interestRate: '10.50% p.a. onwards',
    maxAmount: 'Up to ₹40 Lakh',
    bestFor: 'Personal Needs',
  },
  {
    name: 'Bajaj Finserv',
    logo: 'https://placehold.co/100x40/007bff/ffffff?text=Bajaj+Finserv',
    product: 'Flexi Personal Loan',
    interestRate: '12.99% p.a. onwards',
    maxAmount: 'Up to ₹25 Lakh',
    bestFor: 'Flexible Use',
  },
];

export function InsurerComparison() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Scale className="h-6 w-6 text-primary" />
          Compare & Apply for a Loan
        </CardTitle>
        <CardDescription>
          Find the right loan product and apply directly through our platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Provider</TableHead>
                <TableHead className="font-semibold">Product Name</TableHead>
                <TableHead className="font-semibold text-center">Interest Rate</TableHead>
                <TableHead className="font-semibold">Max Amount</TableHead>
                <TableHead className="font-semibold text-center">Best For</TableHead>
                <TableHead className="font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenders.map((lender) => (
                <TableRow key={lender.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={lender.logo}
                        alt={`${lender.name} logo`}
                        width={80}
                        height={32}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </TableCell>
                  <TableCell>{lender.product}</TableCell>
                  <TableCell className="text-center">{lender.interestRate}</TableCell>
                  <TableCell>{lender.maxAmount}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{lender.bestFor}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" className='bg-primary hover:bg-primary/90'>
                      <Link href={`/apply?lender=${encodeURIComponent(lender.name)}&product=${encodeURIComponent(lender.product)}`}>
                        Apply Now
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
