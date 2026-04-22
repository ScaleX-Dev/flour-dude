'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
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
  { href: '/order', label: 'How to Order' },
  { href: '/contact', label: 'Contact' }
];

export function SiteHeader({ transparent }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const routeWantsTransparent = pathname === '/';
  const useTransparent = transparent ?? routeWantsTransparent;
  const isSolid = !useTransparent || isScrolled;
  const whatsappHref = useMemo(
    () => buildWhatsAppLink(whatsappMessages.default),
    []
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--header-height)] transition-all duration-500 ease-out',
        isSolid 
          ? 'bg-brand-cream/85 backdrop-blur-xl border-b border-brand-border shadow-soft' 
          : 'bg-transparent border-transparent text-white'
      )}
    >
      <div className="content-shell relative flex h-full items-center justify-between">
        <Link 
          href="/" 
          className={cn(
            'inline-flex items-center rounded-xl border px-2.5 py-1.5 transition-all duration-300',
            isSolid
              ? 'border-brand-border bg-brand-warmWhite/80'
              : 'border-white/30 bg-brand-warmWhite/95 backdrop-blur-sm'
          )}
        >
          <Image
            src="/images/flour-dude-logo.png"
            alt="Flour Dude Bakery and Cafe"
            width={168}
            height={64}
            priority
            className="h-10 w-auto md:h-12"
          />
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
                    isSolid ? "bg-brand-caramel" : "bg-brand-warmWhite"
                  )} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 rounded-pill px-5 h-10 font-sans text-[13px] font-medium tracking-wide transition-all duration-300',
              isSolid
                ? 'bg-brand-caramel text-white hover:bg-brand-deepBrown'
                : 'bg-brand-caramel text-white hover:bg-brand-caramelLight'
            )}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current shrink-0" aria-hidden="true">
              <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
            </svg>
            Order Now
          </a>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
                isSolid ? "text-brand-deepBrown hover:bg-brand-deepBrown/5" : "text-white hover:bg-brand-warmWhite/10"
              )}
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[82vw] max-w-[340px] border-none bg-brand-deepBrown p-0 text-brand-cream shadow-2xl"
          >
            <SheetTitle className="sr-only">Main Navigation</SheetTitle>
            <div className="flex h-full flex-col px-5 py-7 sm:px-8 sm:py-10">
              <div className="mb-8 sm:mb-12">
                <Image
                  src="/images/flour-dude-logo.png"
                  alt="Flour Dude Bakery and Cafe"
                  width={168}
                  height={64}
                  className="h-14 w-auto rounded-md bg-brand-warmWhite/95 p-1"
                />
                <div className="w-12 h-[1px] bg-brand-caramel mt-6"></div>
              </div>

              <nav className="grid gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSheetOpen(false)}
                      className={cn(
                        'whitespace-nowrap font-display text-[1.5rem] sm:text-[1.65rem] leading-tight tracking-wide transition-colors duration-300', 
                        isActive ? 'text-brand-caramel' : 'text-brand-cream/70 hover:text-brand-cream'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8 space-y-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-12 text-sm rounded-pill bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-all duration-300 font-medium"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
                    <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
                  </svg>
                  Order via WhatsApp
                </a>
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/35">Open Daily</p>
                  <p className="text-sm text-white/60 font-light">8:30 AM – 9:00 PM</p>
                  <a
                    href="https://instagram.com/flour_dude"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-brand-caramel transition-colors mt-1"
                  >
                    <span>@flour_dude</span>
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
