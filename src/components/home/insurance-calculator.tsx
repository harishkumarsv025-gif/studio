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
import { ShieldCheck } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function InsuranceCalculator() {
  const [coverageAmount, setCoverageAmount] = useState(10000);
  const [riskFactor, setRiskFactor] = useState(5);
  const [policyType, setPolicyType] = useState('health');
  const [monthlyPremium, setMonthlyPremium] = useState<string | null>(null);

  const calculatePremium = () => {
    const baseRate: { [key: string]: number } = {
      health: 0.002,
      property: 0.001,
      crop: 0.005,
      livestock: 0.004,
    };

    const premium = coverageAmount * baseRate[policyType] * (riskFactor / 10);
    setMonthlyPremium(premium.toFixed(2));
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Insurance Premium Calculator
        </CardTitle>
        <CardDescription>
          Estimate your monthly insurance premium. Adjust the sliders to see how costs change.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <Label htmlFor="policyType">Policy Type</Label>
            <Select value={policyType} onValueChange={setPolicyType}>
              <SelectTrigger id="policyType">
                <SelectValue placeholder="Select a policy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Health Insurance</SelectItem>
                <SelectItem value="property">Property Insurance</SelectItem>
                <SelectItem value="crop">Crop Insurance</SelectItem>
                <SelectItem value="livestock">Livestock Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Coverage Amount: ${coverageAmount.toLocaleString()}</Label>
            <Slider
              id="amount"
              min={1000}
              max={100000}
              step={1000}
              value={[coverageAmount]}
              onValueChange={(value) => setCoverageAmount(value[0])}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="risk">Risk Profile (1-10): {riskFactor}</Label>
          <Slider
            id="risk"
            min={1}
            max={10}
            step={1}
            value={[riskFactor]}
            onValueChange={(value) => setRiskFactor(value[0])}
          />
           <p className="text-xs text-muted-foreground">
            A higher score indicates higher risk (e.g., pre-existing conditions, high-risk area).
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={calculatePremium} className="bg-primary hover:bg-primary/90">
          Calculate Monthly Premium
        </Button>
        {monthlyPremium && (
          <div className="text-xl font-bold font-headline text-primary-dark">
            Estimated Monthly Premium:{' '}
            <span className="text-2xl text-primary">${monthlyPremium}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
