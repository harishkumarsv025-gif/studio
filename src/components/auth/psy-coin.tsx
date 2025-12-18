'use client';

import { useUser } from '@/firebase';
import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';

export function PsyCoin() {
  const { user, profile } = useUser();

  if (!user || profile === null) {
    return null;
  }

  return (
    <Badge variant="outline" className="flex items-center gap-2 border-primary/50 text-primary">
      <Coins className="h-4 w-4" />
      <span className="font-semibold">{profile.psyCoins ?? 0}</span>
      <span className="hidden sm:inline">PsyCoins</span>
    </Badge>
  );
}
