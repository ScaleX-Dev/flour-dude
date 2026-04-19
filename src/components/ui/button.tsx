import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-transform transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-caramel/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand-caramel text-white hover:bg-brand-caramel-light rounded-pill px-8 py-3',
        outline: 'border-2 border-brand-caramel text-brand-caramel hover:bg-brand-caramel/10 rounded-pill px-8 py-3',
        dark: 'bg-brand-deepBrown text-brand-cream hover:bg-brand-charcoal rounded-pill px-8 py-3',
        whatsapp: 'bg-[#25D366] text-white hover:bg-[#128C7E] rounded-pill px-8 py-3',
        ghost: 'bg-transparent text-brand-textBody hover:bg-brand-cream rounded-pill px-8 py-3'
      },
      size: {
        default: 'text-sm',
        sm: 'px-6 py-2.5 text-xs',
        lg: 'px-10 py-3.5 text-base',
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
