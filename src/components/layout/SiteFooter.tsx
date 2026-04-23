import Link from 'next/link';
import Image from 'next/image';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/cakes', label: 'Custom Cakes' },
  { href: '/events', label: 'Events & B2B' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' }
];

export function SiteFooter() {
  const waHref = buildWhatsAppLink(whatsappMessages.default);

  return (
    <footer className="bg-brand-deepBrown text-brand-cream">
      {/* Main footer grid */}
      <div className="content-shell pt-16 pb-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">

          {/* Brand column */}
          <div className="space-y-5 lg:col-span-4">
            <Image
              src="/images/flour-dude-logo.png"
              alt="Flour Dude Bakery and Cafe"
              width={200}
              height={76}
              className="h-14 w-auto rounded-lg bg-brand-warmWhite/95 px-3 py-1.5"
            />
            <p className="text-sm text-white/55 leading-relaxed font-light max-w-xs">
              All-day breakfast, handcrafted drinks, custom cakes, and event catering from the heart of Galle, Sri Lanka.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4">
              <span className="text-brand-caramel text-sm">★★★★★</span>
              <span className="text-xs font-medium text-white/60 tracking-wide">5.0 on Uber Eats</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-caramel">
              Explore
            </h3>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="text-sm font-light text-white/50 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect column */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-caramel">
              Connect
            </h3>
            <div className="flex flex-col gap-3 text-sm font-light text-white/50">
              <a
                href="https://instagram.com/flour_dude"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors w-fit"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="content-shell flex flex-col gap-3 py-6 text-[11px] font-light text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Flour Dude. All rights reserved.</p>
          <p className="tracking-widest uppercase">Galle · Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
