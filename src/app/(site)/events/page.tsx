import Image from 'next/image';
import { MessageCircleMore } from 'lucide-react';
import { EventInquiryForm } from '@/components/events/EventInquiryForm';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { DisplayHeading, Eyebrow, SectionHeading, MutedText } from '@/components/ui/Typography';
import { formatLKR } from '@/lib/formatting';
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
    emoji: '🎂',
    title: 'Wedding Cakes',
    body: 'Multi-tier, floral, custom design for your perfect day'
  },
  {
    emoji: '🏢',
    title: 'Corporate Events',
    body: 'Branded cakes, dessert platters, office celebrations'
  },
  {
    emoji: '🏨',
    title: 'Hotel Catering',
    body: 'Professional catering partnerships in Southern Province'
  },
  {
    emoji: '🎈',
    title: 'Birthday Parties',
    body: 'Custom themed cakes for all ages, any size'
  }
];

const highlights = [
  { emoji: '⭐', title: '5.0 Rated', body: 'Verified 140+ reviews' },
  { emoji: '🎨', title: 'Fully Custom', body: 'Designed to your brief' },
  { emoji: '🚚', title: 'Galle Delivery', body: 'We come to you' }
];

const steps = ['Get in touch', 'We plan together', 'We deliver'];

export default function EventsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' }
  ]);

  return (
    <>
      <SchemaMarkup id="schema-breadcrumb-events" schema={breadcrumbSchema} />
      <section className="relative min-h-[460px] overflow-hidden bg-brown-deep">
        <Image src={heroImages.celebration} alt="Flour Dude event catering setup" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="content-shell relative z-10 flex min-h-[460px] flex-col justify-center gap-5 py-12 text-warmWhite">
          <Eyebrow className="text-caramel-light">Events & B2B</Eyebrow>
          <DisplayHeading className="max-w-4xl text-cream">Catering for Every Celebration in Galle</DisplayHeading>
          <MutedText className="max-w-3xl text-cream/85">
            Hotels, corporate offices, wedding planners — we create experiences, not just cakes
          </MutedText>
          <p className="text-sm font-semibold text-caramel-light">Packages from {formatLKR(15000)}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#event-inquiry-form">
              <Button variant="primary" size="lg">
                Get a Custom Quote
              </Button>
            </a>
            <a href={WA.b2b()} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="lg">
                <MessageCircleMore className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell grid grid-cols-2 gap-4 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="rounded-card border border-borderColor bg-warmWhite p-5">
              <p className="text-5xl leading-none">{service.emoji}</p>
              <h2 className="mt-4 text-base font-bold text-brown-deep">{service.title}</h2>
              <p className="mt-2 text-[13px] text-textMuted">{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-warmWhite">
        <div className="content-shell grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-card border border-borderColor bg-cream p-5 text-center">
              <p className="text-4xl">{item.emoji}</p>
              <h3 className="mt-3 text-lg font-semibold text-brown-deep">{item.title}</h3>
              <p className="mt-1 text-sm text-textMuted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="event-inquiry-form" className="section-space bg-cream">
        <div className="content-shell space-y-5">
          <div className="space-y-2 text-center">
            <SectionHeading>Tell us about your event</SectionHeading>
            <MutedText>We reply within 24 hours with a custom quote</MutedText>
          </div>
          <EventInquiryForm />
        </div>
      </section>

      <section className="section-space bg-brown-deep text-warmWhite">
        <div className="content-shell grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step} className="rounded-card border border-white/15 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-caramel-light">Step {index + 1}</p>
              <p className="mt-3 text-lg font-semibold">{step}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
