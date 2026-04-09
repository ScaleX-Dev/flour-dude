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
        'fixed inset-x-0 top-0 z-50 h-[var(--header-height)] transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-in-out backdrop-blur-md',
        isSolid ? 'bg-brown-deep shadow-md shadow-black/20' : 'bg-transparent shadow-none'
      )}
    >
      {transparent && !isScrolled && !isSheetOpen ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-brown-deep/90 to-transparent md:hidden" />
      ) : null}

      <div className="content-shell relative flex h-full items-center justify-between">
        <Link href="/" className="font-display text-[30px] italic text-caramel">
          Flour Dude
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-sans text-[14px] text-cream/80 transition hover:text-caramel',
                  isActive && 'text-caramel'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="whatsapp">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-cream transition hover:bg-cream/10 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm border-l border-white/10 bg-brown-deep p-0 text-cream">
            <SheetTitle className="sr-only">Main Navigation</SheetTitle>
            <div className="flex h-full flex-col px-7 py-8">
              <div className="mb-8">
                <p className="font-display text-3xl italic text-caramel">Flour Dude</p>
              </div>

              <nav className="grid gap-5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSheetOpen(false)}
                      className={cn('font-sans text-lg text-cream/80 transition hover:text-caramel', isActive && 'text-caramel')}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8">
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Order Now On WhatsApp
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
