import type { Metadata } from 'next';
import Image from 'next/image';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { cakePortfolio, formatLkr } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Custom Cake Portfolio',
  description: 'Browse Flour Dude custom cakes in Galle and place your order directly on WhatsApp.'
};

export default function CakesPage() {
  return (
    <>
      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramelLight">Custom Cake Studio</p>
          <h1 className="section-title text-5xl text-brand-warmWhite sm:text-6xl">Designed In Galle. Made For Your Moment.</h1>
          <p className="max-w-2xl text-brand-warmWhite/80">
            Birthdays, weddings, engagements, office parties. Share your theme and we craft a cake that matches your celebration.
          </p>
          <WhatsAppButton label="Start A Custom Cake Chat" messageType="customCake" />
        </div>
      </section>

      <section className="section-space bg-brand-cream">
        <div className="content-shell grid gap-6 md:grid-cols-2">
          {cakePortfolio.map((cake) => (
            <article key={cake.title} className="overflow-hidden rounded-card border border-brand-border bg-brand-warmWhite">
              <div className="relative aspect-[4/3]">
                <Image src={cake.imageUrl} alt={cake.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="space-y-3 p-5">
                <h2 className="text-2xl font-semibold text-brand-deepBrown">{cake.title}</h2>
                <p className="text-sm text-brand-textMuted">{cake.description}</p>
                {cake.priceFrom ? <p className="text-sm font-semibold text-brand-deepBrown">From {formatLkr(cake.priceFrom)}</p> : null}
                <WhatsAppButton
                  label="Order This Style"
                  customMessage={`Hi Flour Dude! I'd like to order a ${cake.title}. Can you help?`}
                  className="w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell rounded-card border border-brand-border bg-brand-cream p-6 text-center sm:p-8">
          <h2 className="section-title text-4xl text-brand-deepBrown">Need A Fully Bespoke Design?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-textMuted">
            Send inspiration images, event date, serving size, and your budget range. We will suggest options and pricing in WhatsApp.
          </p>
          <div className="mt-6">
            <WhatsAppButton label="Request Custom Design & Pricing" messageType="customCake" />
          </div>
        </div>
      </section>
    </>
  );
}
