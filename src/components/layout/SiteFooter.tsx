import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/cakes', label: 'Custom Cakes' },
  { href: '/events', label: 'Events' },
  { href: '/events', label: 'B2B Catering' },
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
            <Image
              src="/images/flour-dude-logo.png"
              alt="Flour Dude Bakery and Cafe"
              width={210}
              height={80}
              className="h-16 w-auto rounded-lg bg-brand-warmWhite p-1"
            />
            <p className="text-base text-brand-cream/70 leading-relaxed font-light">
              All-day breakfast, handcrafted drinks, customised cakes, and event-ready dessert catering from the heart of Galle.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand-warmWhite/5 py-2 px-4 shadow-sm backdrop-blur-sm">
              <span className="text-brand-caramel text-lg">★</span>
              <span className="text-sm font-medium tracking-wide">Rated 5 stars on Uber Eats</span>
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
              <Button asChild className="w-full justify-center rounded-pill h-12 bg-brand-warmWhite text-brand-deepBrown hover:bg-brand-caramel hover:text-white transition-all font-medium">
                <a href={buildWhatsAppLink(whatsappMessages.default)} target="_blank" rel="noopener noreferrer">
                  Order via WhatsApp
                </a>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  className="w-full justify-center rounded-pill h-12 border border-white/20 bg-transparent text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium"
                >
                  <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer">
                    Uber Eats
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center rounded-pill h-12 border border-white/20 bg-transparent text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium"
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
