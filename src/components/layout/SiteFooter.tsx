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
    <footer className="bg-brown-deep text-cream">
      <div className="content-shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-3">
            <h2 className="font-display text-[22px] italic text-caramel">Flour Dude</h2>
            <p className="text-sm text-cream/80">Baked fresh in Galle, every day.</p>
            <p className="text-xs text-cream/60">⭐ 5.0 · 140+ Reviews on Uber Eats</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-cream">Quick Links</h3>
            <nav className="grid gap-2 text-sm text-cream/80">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-caramel">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-cream">Order Now</h3>
            <div className="grid gap-3">
              <Button asChild variant="primary" className="w-full justify-center">
                <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer">
                  Order on Uber Eats
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-center border-cream text-cream hover:bg-cream/10 hover:text-cream"
              >
                <a href="https://pickme.lk/food" target="_blank" rel="noopener noreferrer">
                  Order on PickMe Food
                </a>
              </Button>
              <Button asChild variant="whatsapp" className="w-full justify-center">
                <a href={buildWhatsAppLink(whatsappMessages.default)} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-cream/80">
            <h3 className="mb-4 text-sm font-semibold text-cream">Visit Us</h3>
            <p>Bandara Mawatha & Thalapitiya Road</p>
            <p>Galle, Southern Province, Sri Lanka</p>
            <p>Open Daily 8:30 AM – 9:00 PM</p>
            <p>
              Instagram:{' '}
              <a href="https://instagram.com/flour_dude" target="_blank" rel="noopener noreferrer" className="text-caramel transition hover:text-caramel-light">
                @flour_dude
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-shell flex flex-col gap-2 py-4 text-[12px] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Flour Dude · flourdude.lk</p>
          <p>Built with care in Galle</p>
        </div>
      </div>
    </footer>
  );
}
