import type { Metadata } from 'next';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Flour Dude',
  description: 'Learn the story of Flour Dude, a handcrafted cafe and custom cake studio in Galle, Sri Lanka.'
};

const values = [
  {
    title: 'Handcrafted Daily',
    body: 'Every menu item and cake is made in small batches for freshness and consistency.'
  },
  {
    title: 'Celebration-First',
    body: 'From birthdays to weddings, we design for emotion, not just appearance.'
  },
  {
    title: 'Fast, Human Service',
    body: 'We respond directly on WhatsApp, keeping ordering clear and personal.'
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">Our Story</p>
            <h1 className="section-title text-5xl text-brand-deepBrown sm:text-6xl">A Galle Kitchen Built On Celebration Energy</h1>
            <p className="text-brand-textMuted">
              Flour Dude started with a simple mission: make desserts that feel joyful and generous, while keeping service quick and honest.
              Today we are a hybrid of cafe, custom cake studio, and B2B catering team serving all corners of Galle.
            </p>
            <p className="text-brand-textMuted">
              We combine modern visual cake design with warm, handcrafted baking techniques. The result is food that photographs beautifully but tastes even better.
            </p>
            <div>
              <WhatsAppButton label="Talk To Flour Dude" messageType="default" />
            </div>
          </div>

          <aside className="rounded-card border border-brand-border bg-brand-cream p-5">
            <h2 className="text-lg font-semibold text-brand-deepBrown">Visit & Contact</h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-textBody">
              {siteConfig.locations.map((location) => (
                <li key={location}>{location}</li>
              ))}
              <li>{siteConfig.hours}</li>
              <li>{siteConfig.instagramHandle}</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-space bg-brand-cream">
        <div className="content-shell">
          <h2 className="section-title text-4xl text-brand-deepBrown">What We Stand For</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-card border border-brand-border bg-brand-warmWhite p-5">
                <h3 className="text-xl font-semibold text-brand-deepBrown">{value.title}</h3>
                <p className="mt-2 text-sm text-brand-textMuted">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell rounded-card border border-white/15 p-6 text-center sm:p-8">
          <h2 className="section-title text-4xl text-brand-warmWhite">Ready To Celebrate With Flour Dude?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-warmWhite/80">
            Whether it is a custom cake, a waffle craving, or an event menu, send us a message and we will guide you.
          </p>
          <div className="mt-6">
            <WhatsAppButton label="Start WhatsApp Chat" messageType="default" />
          </div>
        </div>
      </section>
    </>
  );
}
