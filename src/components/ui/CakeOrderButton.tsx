'use client';

import { WA } from '@/lib/whatsapp';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

type CakeOrderButtonProps = {
  cakeName: string;
};

export function CakeOrderButton({ cakeName }: CakeOrderButtonProps) {
  return (
    <WhatsAppButton href={WA.cakeOrder(cakeName)} source="cake-card" variant="primary" size="sm">
      Order This Style →
    </WhatsAppButton>
  );
}
