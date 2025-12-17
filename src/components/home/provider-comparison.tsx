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

const insurers = [
  {
    name: 'GramSuraksha',
    policy: 'HealthGuard',
    premium: '₹150 / month',
    coverage: 'Basic health, hospitalization',
    deductible: '₹2,500',
  },
  {
    name: 'AgriSecure',
    policy: 'Fasal Bima',
    premium: '₹300 / acre',
    coverage: 'Crop failure (drought/flood)',
    deductible: '15% of loss',
  },
  {
    name: 'Janata Shield',
    policy: 'HomeProtect',
    premium: '₹100 / month',
    coverage: 'Home structure damage (fire/natural calamity)',
    deductible: '₹5,000',
  },
];

export function InsurerComparison() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Scale className="h-6 w-6 text-primary" />
          Compare Micro-Insurance Providers
        </CardTitle>
        <CardDescription>
          A quick overview of available insurance products. For personalized advice, use our AI Advisor.
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
                <TableHead className="font-semibold text-center">Deductible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insurers.map((insurer) => (
                <TableRow key={insurer.name}>
                  <TableCell className="font-medium">{insurer.name}</TableCell>
                  <TableCell>{insurer.policy}</TableCell>
                  <TableCell className="text-center">{insurer.premium}</TableCell>
                  <TableCell>{insurer.coverage}</TableCell>
                  <TableCell className="text-center">{insurer.deductible}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
