'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { type User } from 'firebase/auth';
import { createUserProfile } from '@/firebase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';


const profileSchema = z.object({
  displayName: z.string().min(2, 'Name is too short'),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  jobStatus: z.enum(['student', 'employed', 'unemployed', 'other']),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface CompleteProfileDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProfileCompleted: () => void;
}

export function CompleteProfileDialog({
  user,
  open,
  onOpenChange,
  onProfileCompleted,
}: CompleteProfileDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName || '',
      email: user.email || '',
      jobStatus: 'student',
    },
  });

  async function onSubmit(values: ProfileFormData) {
    setLoading(true);
    try {
      // Add initial psyCoins to the profile data
      const profileData = {
        ...values,
        psyCoins: 0,
      };
      await createUserProfile(user.uid, profileData);
      toast({
        title: 'Profile Created!',
        description: "Welcome to PSYCEMONEY! We're glad to have you.",
      });
      onProfileCompleted();
    } catch (error) {
      console.error('Profile Creation Error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not create your profile. Please try again.',
      });
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Just a few more details to get you started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" readOnly disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="e.g., +91 98765 43210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="jobStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Status</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="What do you do?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                           <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="animate-spin" /> : 'Save and Continue'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
