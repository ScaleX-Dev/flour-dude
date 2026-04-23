import Image from 'next/image';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/metadata';
import { heroImages } from '@/lib/site';
import { WA } from '@/lib/whatsapp';

export const metadata = generateMetadata({
  title: 'Event Catering & Corporate Cakes in Galle',
  description:
    'B2B catering, wedding cakes, corporate events in Galle & Southern Province. Get a custom quote from Flour Dude.',
  path: '/events'
});

const services = [
  {
    title: 'Wedding Cakes',
    body: 'Multi-tier, floral, custom design for your perfect day'
  },
  {
    title: 'Corporate Events',
    body: 'Branded cakes, dessert platters, office celebrations'
  },
  {
    title: 'Hotel Partnerships',
    body: 'Professional catering partnerships in Southern Province'
  },
  {
    title: 'Private Gatherings',
    body: 'Custom menus tailored to your guest count and occasion'
  }
];

const eventGrid = [
  {
    src: '/images/bts-customers.jpeg',
    caption: 'Corporate Launch — 50 Guests',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/cake-portfolio-1.jpg',
    caption: 'Wedding Cakes',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/bts-team.jpeg',
    caption: 'Corporate Platter Supply',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/cake-portfolio-3.jpg',
    caption: 'Birthday Celebration — Custom Order',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/cake-portfolio-4.jpg',
    caption: 'Private Gathering — Dessert Table',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/cake-portfolio-2.jpg',
    caption: 'Anniversary Cake — Intimate Celebration',
    aspect: 'aspect-[4/5]'
  }
];

export default function EventsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' }
  ]);

  return (
    <>
      <SchemaMarkup id="schema-breadcrumb-events" schema={breadcrumbSchema} />

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(520px+var(--header-height))] bg-brand-deepBrown text-white flex flex-col justify-end pb-16 md:pb-24 pt-[calc(var(--header-height)+3rem)]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImages.events}
            alt="Flour Dude event catering setup"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-60 scale-105 animate-[ken-burns_30s_ease-out_forwards]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deepBrown/90 via-brand-deepBrown/55 to-brand-deepBrown/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown/70 via-transparent to-brand-deepBrown/30" />

        <div className="relative z-10 w-full animate-rise-in px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-2xl space-y-5">
            <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Events &amp; B2B Catering
            </p>
            <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              Celebrations Worth Catering
            </h1>
            <p className="text-base sm:text-lg font-light leading-relaxed text-white/75 max-w-xl">
              Corporate events, restaurant partnerships, private gatherings. Custom cafe-menus tailored to your event and guest count.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
              <a
                href={WA.b2b()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill px-7 min-h-[52px] bg-brand-caramel text-white font-medium text-sm hover:bg-brand-caramelLight transition-all duration-300 shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
                </svg>
                Get a Quote on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section-space bg-brand-cream border-b border-brand-border">
        <div className="content-shell space-y-14">
          <div className="max-w-2xl space-y-4">
            <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-caramel">
              What We Offer
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              Custom menus for every occasion
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="p-7 rounded-2xl border border-brand-border/40 bg-brand-warmWhite hover:shadow-soft transition-all duration-300"
              >
                <div className="font-display text-sm text-brand-caramel font-semibold tracking-[0.2em] mb-6">
                  0{index + 1}
                </div>
                <h3 className="font-display text-2xl text-brand-deepBrown mb-2">{service.title}</h3>
                <p className="text-brand-textMuted font-light text-sm leading-relaxed">{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-caramel">
              Past Events
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              From intimate gatherings to group celebrations.
            </h2>
            <p className="text-brand-textMuted font-light text-base sm:text-lg leading-relaxed max-w-xl">
              See the events we&apos;ve brought to life.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {eventGrid.map((item) => (
              <div key={item.caption} className="group relative overflow-hidden rounded-2xl bg-brand-cream">
                <div className={`relative w-full ${item.aspect}`}>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown/80 via-brand-deepBrown/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section className="section-space bg-brand-deepBrown text-white">
        <div className="content-shell">
          <div className="max-w-3xl mx-auto text-center space-y-7">
            <div className="space-y-4">
              <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-caramel">
                Let&apos;s Plan Together
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
                Tell us about your event.
              </h2>
              <p className="text-white/60 font-light text-base sm:text-lg max-w-xl mx-auto">
                Message us on WhatsApp with your event date, guest count, and what you have in mind. We&apos;ll come back with a custom quote.
              </p>
            </div>
            <a
              href={WA.b2b()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-pill px-8 min-h-[56px] bg-[#25D366] text-white font-medium hover:bg-[#1ebe5d] transition-all tracking-wide text-sm shadow-xl"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
                <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
              </svg>
              Request a Quote on WhatsApp
            </a>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[11px] font-medium text-white/35 uppercase tracking-widest">
              <span>Galle &amp; Southern Province</span>
              <span className="text-brand-caramel/40">✦</span>
              <span>Custom Menus</span>
              <span className="text-brand-caramel/40">✦</span>
              <span>Any Guest Count</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
