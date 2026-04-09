import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { cakePortfolio, formatLkr, heroImages, siteConfig, testimonials } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Custom Cakes, Cafe Menu & Catering In Galle',
  description:
    'Flour Dude is a cafe and custom cake studio in Galle, Sri Lanka. Order custom cakes on WhatsApp, browse menu prices in LKR, and book B2B catering.'
};

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[80vh] overflow-hidden bg-brand-deepBrown text-brand-warmWhite">
        <Image
          src={heroImages.cake}
          alt="Signature Flour Dude cake table"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deepBrown/90 via-brand-deepBrown/65 to-brand-deepBrown/35" />

        <div className="content-shell relative z-10 flex min-h-[80vh] items-end py-16 sm:py-20">
          <div className="max-w-3xl animate-rise-in space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-caramelLight">Galle, Southern Province</p>
            <h1 className="section-title text-5xl text-brand-warmWhite sm:text-6xl lg:text-7xl">
              Custom Cakes That Look Like Art And Taste Even Better.
            </h1>
            <p className="max-w-2xl text-base text-brand-warmWhite/85 sm:text-lg">
              Flour Dude blends cafe comfort with celebration baking. We build birthday, wedding, and event cakes to brief, with quick WhatsApp support.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppButton label="Start Your Cake Order" messageType="customCake" className="min-w-56" />
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-button border border-white/35 px-6 py-3 text-sm font-semibold text-brand-warmWhite transition hover:border-brand-caramelLight hover:text-brand-caramelLight"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-cream">
        <div className="content-shell rounded-card border border-brand-border bg-brand-warmWhite p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-rose">This Week Only</p>
              <h2 className="section-title mt-2 text-4xl text-brand-deepBrown">Weekend Celebration Drop</h2>
              <p className="mt-2 max-w-2xl text-brand-textMuted">
                Limited prep slots for custom cakes from Friday to Sunday. Reserve your date early on WhatsApp to avoid missing the run.
              </p>
            </div>
            <WhatsAppButton label="Reserve A Slot" messageType="customCake" />
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-sage">Signature Picks</p>
            <h2 className="section-title text-4xl text-brand-deepBrown">Artwork-Style Favourites</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cakePortfolio.map((cake) => (
              <article key={cake.title} className="group overflow-hidden rounded-card border border-brand-border bg-brand-warmWhite shadow-sm">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={cake.imageUrl}
                    alt={cake.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className={`space-y-2 p-4 ${cake.accent}`}>
                  <h3 className="font-semibold text-brand-deepBrown">{cake.title}</h3>
                  <p className="text-sm text-brand-textMuted">{cake.description}</p>
                  {cake.priceFrom ? <p className="text-sm font-semibold text-brand-deepBrown">From {formatLkr(cake.priceFrom)}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramelLight">Custom Cake Studio</p>
            <h2 className="section-title mt-3 text-4xl text-brand-warmWhite sm:text-5xl">Tell Us Your Theme. We Build It.</h2>
            <p className="mt-4 max-w-xl text-brand-warmWhite/80">
              Send reference images, guest count, and event date. We propose design, flavour, and pricing quickly in WhatsApp so you can confirm fast.
            </p>
            <div className="mt-6">
              <WhatsAppButton label="Design My Custom Cake" messageType="customCake" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-card">
            <Image src={heroImages.waffle} alt="Flour Dude waffle and dessert table" width={900} height={700} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-cream">
        <div className="content-shell space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-sage">Social Proof</p>
              <h2 className="section-title text-4xl text-brand-deepBrown">Loved Across Galle</h2>
            </div>
            <p className="rounded-pill bg-brand-sage/15 px-4 py-2 text-sm font-semibold text-brand-sage">{siteConfig.ratingLabel}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item.customerName} className="rounded-card border border-brand-border bg-brand-warmWhite p-5">
                <p className="text-sm leading-relaxed text-brand-textBody">&ldquo;{item.message}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold text-brand-deepBrown">
                  {item.customerName} - {'★'.repeat(item.rating ?? 5)}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f8e1dc]">
        <div className="content-shell grid gap-8 rounded-card border border-brand-border/80 bg-brand-warmWhite p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-rose">For Hotels, Offices, Weddings</p>
            <h2 className="section-title mt-2 text-4xl text-brand-deepBrown">B2B Catering Built For Busy Teams</h2>
            <p className="mt-4 max-w-xl text-brand-textMuted">
              Dessert platters, coffee breaks, launch events, and wedding dessert bars across Galle. Menus are custom-quoted by headcount and event format.
            </p>
            <div className="mt-6">
              <WhatsAppButton label="Discuss B2B Catering" messageType="b2b" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-card">
            <Image src={heroImages.celebration} alt="Dessert catering setup" width={900} height={720} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell grid gap-5 rounded-card border border-brand-border bg-brand-cream p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          <div className="rounded-card bg-brand-warmWhite p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">How To Order</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-deepBrown">1. Message On WhatsApp</h3>
            <p className="mt-2 text-sm text-brand-textMuted">Send your product, size, and date. You receive a quick response with availability.</p>
          </div>
          <div className="rounded-card bg-brand-warmWhite p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">Delivery</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-deepBrown">2. Uber Eats Or PickMe</h3>
            <p className="mt-2 text-sm text-brand-textMuted">Daily menu items are active on both platforms for the Galle area.</p>
          </div>
          <div className="rounded-card bg-brand-warmWhite p-5 sm:col-span-2 lg:col-span-1">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">Collect Or Receive</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-deepBrown">3. Enjoy Fresh</h3>
            <p className="mt-2 text-sm text-brand-textMuted">Pickup from Bandara Mawatha or get delivery to your doorstep in Galle.</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell space-y-5 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramelLight">Ready To Order?</p>
          <h2 className="section-title text-4xl text-brand-warmWhite sm:text-5xl">Your WhatsApp Message Is One Tap Away.</h2>
          <p className="mx-auto max-w-2xl text-brand-warmWhite/80">
            No checkout, no waiting on forms. Message Flour Dude now and we will guide your order from first idea to final delivery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton label="Order A Cake Now" messageType="customCake" />
            <WhatsAppButton label="Ask About Catering" messageType="b2b" className="bg-brand-rose hover:bg-[#e5a592]" />
          </div>
        </div>
      </section>
    </>
  );
}
