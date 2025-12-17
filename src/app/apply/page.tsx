
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const applicationSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  phone: z.string().min(10, 'A valid 10-digit phone number is required'),
  email: z.string().email('A valid email is required'),
  address: z.string().min(10, 'Full address is required'),
  policyName: z.string(),
  insurerName: z.string(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

function ApplicationForm() {
  const searchParams = useSearchParams();
  const insurer = searchParams.get('insurer') || 'Selected Insurer';
  const policy = searchParams.get('policy') || 'Selected Policy';

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      insurerName: insurer,
      policyName: policy,
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormValues> = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast({
      title: 'Application Submitted!',
      description: 'We have received your application and will contact you shortly.',
    });
    reset();
  };

  return (
    <div className="flex-grow bg-slate-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              Apply for Insurance
            </CardTitle>
            <CardDescription>
              Applying for: <strong>{policy}</strong> with <strong>{insurer}</strong>.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register('fullName')} />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register('phone')} />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea id="address" {...register('address')} />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>
              <input type="hidden" {...register('insurerName')} />
              <input type="hidden" {...register('policyName')} />
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Service Fee</AlertTitle>
                <AlertDescription>
                  A one-time service fee of <strong>₹50</strong> will be applied to process your application and connect you with the provider.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}


export default function ApplyPage() {
    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <ApplicationForm />
          </Suspense>
        </div>
    );
}
