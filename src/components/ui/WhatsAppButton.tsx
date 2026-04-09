'use client';

import type { ReactNode } from 'react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type WhatsAppButtonProps = {
  href: string;
  variant: 'primary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  source: string;
  children: ReactNode;
};

const sizeClasses: Record<WhatsAppButtonProps['size'], string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

const variantClasses: Record<WhatsAppButtonProps['variant'], string> = {
  primary: 'bg-[#25D366] text-white hover:bg-[#20BA5A]',
  outline: 'border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10',
  ghost: 'text-[#25D366] underline hover:no-underline'
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Zm-8.35 18.13h-.01a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.81 1.1 1.11-3.71-.24-.38a9.83 9.83 0 01-1.5-5.2c0-5.44 4.42-9.86 9.86-9.86 2.63 0 5.1 1.03 6.97 2.9a9.77 9.77 0 012.88 6.96c0 5.43-4.43 9.85-9.87 9.85Zm5.41-7.39c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.69.15-.2.3-.79.99-.97 1.2-.18.2-.36.22-.67.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.51-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.69-1.66-.95-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.65.71.23 1.36.2 1.87.12.57-.08 1.8-.74 2.05-1.45.25-.72.25-1.34.17-1.47-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function WhatsAppButton({ href, variant, size, source, children }: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(source)}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition',
        sizeClasses[size],
        variantClasses[variant]
      )}
    >
      {variant === 'primary' ? <WhatsAppIcon /> : null}
      {children}
    </a>
  );
}
