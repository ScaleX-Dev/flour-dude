import Link from 'next/link';
import Image from 'next/image';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/cakes', label: 'Custom Cakes' },
  { href: '/events', label: 'Events & B2B' },
  { href: '/about', label: 'About Us' },
  { href: '/order', label: 'How to Order' },
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
              <a
                href="https://www.ubereats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors w-fit"
              >
                Uber Eats
              </a>
              <a
                href="https://pickme.lk/food"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors w-fit"
              >
                PickMe Food
              </a>
            </div>
          </div>

          {/* Order column */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-caramel">
              Order Now
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-pill h-11 bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe5d] transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
                </svg>
                WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.ubereats.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full rounded-pill h-10 border border-white/15 text-white/70 text-xs font-medium hover:border-white/40 hover:text-white transition-all"
                >
                  Uber Eats
                </a>
                <a
                  href="https://pickme.lk/food"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full rounded-pill h-10 border border-white/15 text-white/70 text-xs font-medium hover:border-white/40 hover:text-white transition-all"
                >
                  PickMe
                </a>
              </div>
            </div>

            <div className="text-xs text-white/35 font-light space-y-1 pt-2">
              <p>Bandara Mawatha & Thalapitiya Road</p>
              <p>Galle, Southern Province, Sri Lanka</p>
              <p className="text-white/55 font-medium pt-1">Open Daily · 8:30 AM – 9:00 PM</p>
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
