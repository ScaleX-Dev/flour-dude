import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-transform transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-caramel/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand-caramel text-white hover:bg-brand-caramel-light rounded-pill px-6 py-2.5 sm:px-8 sm:py-3',
        outline: 'border-2 border-brand-caramel text-brand-caramel hover:bg-brand-caramel/10 rounded-pill px-6 py-2.5 sm:px-8 sm:py-3',
        dark: 'bg-brand-deepBrown text-brand-cream hover:bg-brand-charcoal rounded-pill px-6 py-2.5 sm:px-8 sm:py-3',
        whatsapp: 'bg-[var(--wa-green)] text-white hover:brightness-95 rounded-pill px-6 py-2.5 sm:px-8 sm:py-3',
        ghost: 'bg-transparent text-brand-textBody hover:bg-brand-cream rounded-pill px-6 py-2.5 sm:px-8 sm:py-3'
      },
      size: {
        default: 'text-sm',
        sm: 'px-4 py-2 text-xs sm:px-6 sm:py-2.5',
        lg: 'px-8 py-3 text-base sm:px-10 sm:py-3.5',
        icon: 'h-10 w-10 rounded-pill p-0',
        'icon-sm': 'h-8 w-8 rounded-pill p-0'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
