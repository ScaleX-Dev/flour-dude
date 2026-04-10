import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/cakes', label: 'Custom Cakes' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/order', label: 'How to Order' },
  { href: '/contact', label: 'Contact' }
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-deepBrown text-brand-cream">
      <div className="content-shell pt-20 pb-16">
        <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-4 pr-8">
            <h2 className="font-display text-4xl tracking-tight text-white">Flour Dude.</h2>
            <p className="text-base text-brand-cream/70 leading-relaxed font-light">
              Premium custom cakes, artisanal bakes, and exceptional coffee. Crafted with passion in the heart of Galle, Sri Lanka.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 shadow-sm backdrop-blur-sm">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-sm font-medium tracking-wide">5.0 on Uber Eats (140+ Reviews)</span>
            </div>
          </div>

          <div className="xl:col-span-2 xl:col-start-7">
            <h3 className="mb-6 font-sans text-sm font-semibold tracking-[0.15em] uppercase text-brand-caramel">Explore</h3>
            <nav className="flex flex-col gap-4 text-base font-light text-brand-cream/70">
              {quickLinks.slice(0, 4).map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-white w-fit">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="xl:col-span-2">
            <h3 className="mb-6 font-sans text-sm font-semibold tracking-[0.15em] uppercase text-brand-caramel">Connect</h3>
            <nav className="flex flex-col gap-4 text-base font-light text-brand-cream/70">
              {quickLinks.slice(4).map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-white w-fit">
                  {link.label}
                </Link>
              ))}
              <a href="https://instagram.com/flour_dude" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white w-fit">
                Instagram
              </a>
            </nav>
          </div>

          <div className="xl:col-span-3 space-y-6">
            <h3 className="mb-6 font-sans text-sm font-semibold tracking-[0.15em] uppercase text-brand-caramel">Order Now</h3>
            <div className="grid gap-3">
              <Button asChild className="w-full justify-center rounded-pill h-12 bg-white text-brand-deepBrown hover:bg-brand-caramel hover:text-white transition-all font-medium">
                <a href={buildWhatsAppLink(whatsappMessages.default)} target="_blank" rel="noopener noreferrer">
                  Order via WhatsApp
                </a>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  className="w-full justify-center rounded-pill h-12 border border-white/20 bg-transparent text-white hover:bg-white hover:text-brand-deepBrown transition-all font-medium"
                >
                  <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer">
                    Uber Eats
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center rounded-pill h-12 border border-white/20 bg-transparent text-white hover:bg-white hover:text-brand-deepBrown transition-all font-medium"
                >
                  <a href="https://pickme.lk/food" target="_blank" rel="noopener noreferrer">
                    PickMe
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="pt-4 text-sm text-brand-cream/50 font-light space-y-1">
              <p>Bandara Mawatha & Thalapitiya Road</p>
              <p>Galle, Southern Province</p>
              <p className="font-medium text-brand-cream/80 pt-2">8:30 AM – 9:00 PM Daily</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-shell flex flex-col gap-4 py-8 text-[13px] font-light text-brand-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Flour Dude. All rights reserved.</p>
          <p className="tracking-wide">DESIGNED WITH CARE IN GALLE</p>
        </div>
      </div>
    </footer>
  );
}
