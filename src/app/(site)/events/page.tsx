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
      <section className="relative h-[540px] md:h-[640px] overflow-hidden bg-brand-deepBrown text-white flex flex-col justify-end pb-16 md:pb-24 pt-32">
        <Image 
          src={heroImages.celebration} 
          alt="Flour Dude event catering setup" 
          fill 
          priority 
          sizes="100vw" 
          className="object-cover opacity-60 scale-105 animate-[ken-burns_30s_ease-out_forwards]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown via-brand-deepBrown/40 to-transparent" />

        <div className="content-shell relative z-10 w-full animate-rise-in">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Events & B2B
            </h1>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[80px] tracking-tighter text-white leading-[0.95]">
              Celebrate in Style.
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 max-w-2xl">
              From intimate gatherings to grand hotel banquets, we create unforgettable dessert experiences across Galle and the Southern Province.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a href="#event-inquiry-form">
                <Button className="rounded-pill px-8 h-14 bg-brand-caramel text-white hover:bg-brand-caramel/90 transition-all font-medium tracking-wide">
                  Request a Quote
                </Button>
              </a>
              <a href={WA.b2b()} target="_blank" rel="noreferrer">
                <Button className="rounded-pill px-8 h-14 border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-brand-deepBrown transition-all font-medium tracking-wide flex items-center gap-2">
                  <MessageCircleMore className="h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-cream border-b border-brand-border/60">
        <div className="content-shell space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Our Services
            </h2>
            <h3 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              Curated for Your Needs
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <article 
                key={service.title} 
                style={{ animationDelay: `${index * 100}ms` }}
                className="group p-8 rounded-[32px] border border-brand-border/40 bg-white shadow-sm hover:shadow-floating hover:border-brand-border duration-500 transition-all"
              >
                <div className="w-16 h-16 rounded-[20px] bg-brand-cream border border-brand-border/50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                  {service.emoji}
                </div>
                <h4 className="mt-8 text-2xl font-display text-brand-deepBrown group-hover:text-brand-caramel transition-colors">
                  {service.title}
                </h4>
                <p className="mt-3 text-brand-textMuted font-light leading-relaxed">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white border-b border-brand-border/60">
        <div className="content-shell grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <article 
              key={item.title} 
              style={{ animationDelay: `${index * 150}ms` }}
              className="flex flex-col items-center text-center p-8 rounded-[32px] bg-brand-cream/30 border border-brand-border/30 hover:bg-brand-cream transition-colors"
            >
              <p className="text-4xl mb-6">{item.emoji}</p>
              <h3 className="text-xl font-display text-brand-deepBrown mb-2">{item.title}</h3>
              <p className="text-brand-textMuted font-light">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-white">
        <div className="content-shell space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              How It Works
            </h2>
            <h3 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-tight">
              A Seamless Process
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article 
                key={step} 
                className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition-colors"
              >
                <div className="text-brand-caramel/20 font-display text-7xl absolute top-4 right-6 pointer-events-none">
                  0{index + 1}
                </div>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel mb-4">Phase {index + 1}</p>
                <p className="text-2xl font-display text-white relative z-10">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="event-inquiry-form" className="section-space bg-brand-cream py-24">
        <div className="content-shell max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              Let's Talk About Your Event
            </h2>
            <p className="text-lg text-brand-textMuted font-light">
              Fill out the form below. We aim to reply within 24 hours with a custom quote.
            </p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[32px] border border-brand-border/40 shadow-floating">
            <EventInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
