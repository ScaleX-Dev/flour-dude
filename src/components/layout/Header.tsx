import Link from 'next/link';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { siteConfig } from '@/lib/site';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/cakes', label: 'Cakes' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/order', label: 'Order' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/40 bg-brand-deepBrown text-brand-warmWhite shadow-sm backdrop-blur">
      <div className="border-b border-white/10 py-2">
        <div className="content-shell flex items-center justify-between text-xs text-brand-warmWhite/80">
          <p>{siteConfig.ratingLabel}</p>
          <p className="hidden sm:block">Open daily: {siteConfig.hours}</p>
        </div>
      </div>

      <div className="content-shell flex items-center justify-between py-4">
        <Link href="/" className="font-display text-3xl italic tracking-tight text-brand-warmWhite">
          Flour Dude
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-brand-warmWhite/90 transition hover:text-brand-caramelLight">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton label="Order On WhatsApp" messageType="default" />
        </div>
      </div>

      <div className="content-shell pb-4 md:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-pill border border-white/20 px-3 py-1.5 text-brand-warmWhite/90"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
