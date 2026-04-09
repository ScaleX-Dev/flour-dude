import type { Metadata } from 'next';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Events & B2B Catering',
  description: 'Corporate and event catering in Galle for hotels, planners, and companies. Discuss packages on WhatsApp.'
};

const b2bSegments = [
  'Hotels and boutique properties',
  'Corporate offices and launches',
  'Wedding planners and venues',
  'Schools and private functions'
];

const inclusions = [
  'Dessert platters and mini pastries',
  'Coffee break combos with wraps and sweet bites',
  'Branded packaging for corporate gifting',
  'Recurring weekly and monthly catering schedules'
];

export default function EventsPage() {
  return (
    <>
      <section className="section-space bg-[#f8e1dc]">
        <div className="content-shell space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-rose">B2B & Events</p>
          <h1 className="section-title text-5xl text-brand-deepBrown sm:text-6xl">Catering For Galle&apos;s Hotels, Teams, And Celebrations</h1>
          <p className="max-w-2xl text-brand-textMuted">
            Flour Dude supports one-off events and recurring catering with custom-quoted menus. Fast planning happens entirely on WhatsApp.
          </p>
          <WhatsAppButton label="Get A B2B Catering Quote" messageType="b2b" />
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell grid gap-5 md:grid-cols-2">
          <article className="rounded-card border border-brand-border bg-brand-cream p-6">
            <h2 className="section-title text-3xl text-brand-deepBrown">Who We Work With</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-textBody">
              {b2bSegments.map((item) => (
                <li key={item} className="rounded-card bg-brand-warmWhite p-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-card border border-brand-border bg-brand-cream p-6">
            <h2 className="section-title text-3xl text-brand-deepBrown">Popular Inclusions</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-textBody">
              {inclusions.map((item) => (
                <li key={item} className="rounded-card bg-brand-warmWhite p-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell rounded-card border border-white/15 p-6 sm:p-8">
          <h2 className="section-title text-4xl text-brand-warmWhite">How B2B Booking Works</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-card bg-white/5 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramelLight">Step 1</p>
              <h3 className="mt-2 text-lg font-semibold">Share Event Details</h3>
              <p className="mt-2 text-sm text-brand-warmWhite/80">Date, headcount, location, dietary notes, and service style.</p>
            </div>
            <div className="rounded-card bg-white/5 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramelLight">Step 2</p>
              <h3 className="mt-2 text-lg font-semibold">Receive Tailored Menu</h3>
              <p className="mt-2 text-sm text-brand-warmWhite/80">You get practical options and a custom quote without hidden charges.</p>
            </div>
            <div className="rounded-card bg-white/5 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramelLight">Step 3</p>
              <h3 className="mt-2 text-lg font-semibold">Confirm & Relax</h3>
              <p className="mt-2 text-sm text-brand-warmWhite/80">We prep, pack, and coordinate reliable delivery in Galle.</p>
            </div>
          </div>
          <div className="mt-6">
            <WhatsAppButton label="Plan My Event Catering" messageType="b2b" />
          </div>
        </div>
      </section>
    </>
  );
}
