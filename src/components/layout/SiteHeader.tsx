'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';
import { cn } from '@/lib/utils';

type SiteHeaderProps = {
  transparent?: boolean;
};

const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/cakes', label: 'Our Cakes' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/order', label: 'How to Order' }
];

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isSolid = !transparent || isScrolled;
  const whatsappHref = useMemo(
    () => buildWhatsAppLink(whatsappMessages.default),
    []
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--header-height)] transition-all duration-500 ease-out',
        isSolid 
          ? 'bg-brand-cream/85 backdrop-blur-xl border-b border-brand-border/60 shadow-soft' 
          : 'bg-transparent border-transparent text-white'
      )}
    >
      <div className="content-shell relative flex h-full items-center justify-between">
        <Link 
          href="/" 
          className={cn(
            "font-display text-2xl md:text-[28px] tracking-tight font-medium transition-colors duration-300",
            isSolid ? "text-brand-deepBrown" : "text-white"
          )}
        >
          Flour Dude.
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-sans text-[13px] tracking-[0.08em] uppercase transition-colors duration-300 relative group',
                  isSolid ? 'text-brand-textBody hover:text-brand-caramel' : 'text-white/90 hover:text-white',
                  isActive && (isSolid ? 'text-brand-caramel font-semibold' : 'text-white font-semibold')
                )}
              >
                {link.label}
                {isActive && (
                  <span className={cn(
                    "absolute -bottom-2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 rounded-full",
                    isSolid ? "bg-brand-caramel" : "bg-white"
                  )} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild className={cn(
            "rounded-pill px-6 h-11 font-sans text-sm tracking-wide transition-all duration-300",
            isSolid 
              ? "bg-brand-deepBrown text-white hover:bg-brand-caramel hover:text-white" 
              : "bg-white text-brand-deepBrown hover:bg-brand-caramel hover:text-white"
          )}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Order Now
            </a>
          </Button>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
                isSolid ? "text-brand-deepBrown hover:bg-brand-deepBrown/5" : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full max-w-[400px] border-none bg-brand-deepBrown p-0 text-brand-cream shadow-2xl"
          >
            <SheetTitle className="sr-only">Main Navigation</SheetTitle>
            <div className="flex h-full flex-col px-10 py-12">
              <div className="mb-16">
                <p className="font-display text-3xl text-brand-cream">Flour Dude.</p>
                <div className="w-12 h-[1px] bg-brand-caramel mt-6"></div>
              </div>

              <nav className="grid gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSheetOpen(false)}
                      className={cn(
                        'font-display text-2xl tracking-wide transition-colors duration-300', 
                        isActive ? 'text-brand-caramel' : 'text-brand-cream/70 hover:text-brand-cream'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-10 border-t border-white/10">
                <Button 
                  asChild 
                  className="w-full h-14 text-base rounded-pill bg-brand-caramel text-white hover:bg-white hover:text-brand-deepBrown transition-all duration-300"
                >
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Order via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
