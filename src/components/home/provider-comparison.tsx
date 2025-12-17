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

const insurers = [
  {
    name: 'LIC',
    logo: 'https://placehold.co/100x40/f8f8f8/000000?text=LIC',
    policy: 'Aam Aadmi Bima Yojana',
    premium: '₹100 / year',
    coverage: 'Natural/Accidental death & disability',
    bestFor: 'Life & Accident',
  },
  {
    name: 'HDFC Ergo',
    logo: 'https://placehold.co/100x40/ffffff/c40000?text=HDFC+Ergo',
    policy: 'Crop Insurance (PMFBY)',
    premium: 'As per crop & season',
    coverage: 'Crop yield loss due to non-preventable risks',
    bestFor: 'Agriculture',
  },
  {
    name: 'ICICI Lombard',
    logo: 'https://placehold.co/100x40/ffffff/004d98?text=ICICI+Lombard',
    policy: 'Health Advantage Plus',
    premium: '₹200 / month',
    coverage: 'Hospitalization expenses',
    bestFor: 'Health',
  },
];

export function InsurerComparison() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Scale className="h-6 w-6 text-primary" />
          Compare & Apply for Insurance
        </CardTitle>
        <CardDescription>
          Find the right policy and apply directly through our platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Provider</TableHead>
                <TableHead className="font-semibold">Policy Name</TableHead>
                <TableHead className="font-semibold text-center">Typical Premium</TableHead>
                <TableHead className="font-semibold">Key Coverage</TableHead>
                <TableHead className="font-semibold text-center">Best For</TableHead>
                <TableHead className="font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insurers.map((insurer) => (
                <TableRow key={insurer.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={insurer.logo}
                        alt={`${insurer.name} logo`}
                        width={80}
                        height={32}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </TableCell>
                  <TableCell>{insurer.policy}</TableCell>
                  <TableCell className="text-center">{insurer.premium}</TableCell>
                  <TableCell>{insurer.coverage}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{insurer.bestFor}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" className='bg-primary hover:bg-primary/90'>
                      <Link href={`/apply?insurer=${encodeURIComponent(insurer.name)}&policy=${encodeURIComponent(insurer.policy)}`}>
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
