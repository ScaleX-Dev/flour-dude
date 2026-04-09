import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

export function DisplayHeading({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'font-display text-[clamp(32px,5vw,64px)] italic leading-[1.04] text-brown-deep',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function SectionHeading({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        'font-display text-[clamp(22px,3vw,36px)] font-bold leading-[1.1] text-brown-deep',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function Eyebrow({ children, className }: TypographyProps) {
  return (
    <p className={cn('font-sans text-[11px] uppercase tracking-[0.15em] text-caramel', className)}>
      {children}
    </p>
  );
}

export function BodyText({ children, className }: TypographyProps) {
  return <p className={cn('font-sans text-[15px] font-normal leading-relaxed text-textBody', className)}>{children}</p>;
}

export function MutedText({ children, className }: TypographyProps) {
  return <p className={cn('font-sans text-[14px] font-normal text-textMuted', className)}>{children}</p>;
}
