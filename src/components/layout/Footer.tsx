import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-deepBrown text-brand-warmWhite">
      <div className="content-shell grid gap-8 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <h2 className="font-display text-3xl italic">Flour Dude</h2>
          <p className="text-sm text-brand-warmWhite/80">
            Artisan cakes, cafe comfort food, and event catering made in Galle, Southern Province.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-brand-caramelLight">Visit</h3>
          <ul className="space-y-2 text-sm text-brand-warmWhite/85">
            {siteConfig.locations.map((location) => (
              <li key={location}>{location}</li>
            ))}
            <li>{siteConfig.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-brand-caramelLight">Order Channels</h3>
          <ul className="space-y-2 text-sm text-brand-warmWhite/85">
            <li>
              <a href="https://www.ubereats.com" target="_blank" rel="noreferrer" className="transition hover:text-brand-caramelLight">
                Uber Eats - Galle
              </a>
            </li>
            <li>
              <a href="https://pickme.lk/food" target="_blank" rel="noreferrer" className="transition hover:text-brand-caramelLight">
                PickMe Food - Galle
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/flour_dude"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-brand-caramelLight"
              >
                Instagram {siteConfig.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-brand-caramelLight">Order Instantly</h3>
          <p className="text-sm text-brand-warmWhite/80">Tell us your date, flavour, and design ideas. We reply quickly on WhatsApp.</p>
          <WhatsAppButton label="Chat On WhatsApp" messageType="default" className="w-full" />
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-warmWhite/70">
        <p>{siteConfig.name} - {new Date().getFullYear()} - flourdude.lk</p>
      </div>
    </footer>
  );
}
