import Image from 'next/image';
import Link from 'next/link';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { DisplayHeading, Eyebrow, SectionHeading, MutedText } from '@/components/ui/Typography';
import { generateMetadata } from '@/lib/metadata';
import { getSiteSettingsData } from '@/lib/payload';
import { buildWhatsAppLink, heroImages, whatsappMessages } from '@/lib/site';

export const metadata = generateMetadata({
  title: 'About Flour Dude — Our Story · Galle Bakery',
  description:
    "Meet the team behind Flour Dude — Galle's most celebrated bakery and custom cake studio. Baked with love every day.",
  path: '/about'
});

const values = [
  {
    title: 'Quality Ingredients',
    body: 'Locally sourced where possible'
  },
  {
    title: 'Made Fresh Daily',
    body: 'Baked every morning, never day-old'
  },
  {
    title: 'Custom Designs',
    body: 'Every cake designed from scratch'
  },
  {
    title: 'Community First',
    body: 'Proudly serving Galle since day one'
  }
];

export default async function AboutPage() {
  const settings = await getSiteSettingsData();
  const founderImage = settings.founderPhotoUrl ?? heroImages.celebration;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ]);

  return (
    <>
      <SchemaMarkup id="schema-breadcrumb-about" schema={breadcrumbSchema} />
      <section className="relative h-[480px] md:h-[540px] overflow-hidden bg-brand-deepBrown text-white flex flex-col justify-end pb-16 md:pb-24 pt-32">
        <Image 
          src={founderImage} 
          alt="Founder of Flour Dude" 
          fill 
          priority 
          sizes="100vw" 
          className="object-cover opacity-50 scale-105 animate-[ken-burns_30s_ease-out_forwards]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown via-brand-deepBrown/50 to-transparent" />

        <div className="content-shell relative z-10 w-full animate-rise-in">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Our Story
            </h1>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[80px] tracking-tighter text-white leading-[1] md:leading-[0.95]">
              About Flour Dude.
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/80 max-w-2xl">
              We are a Galle-born bakery cafe focused on all-day comfort food, handcrafted drinks, and customised cakes for life&apos;s biggest moments.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space border-b border-brand-border bg-brand-cream">
        <div className="content-shell grid gap-16 lg:grid-cols-[1fr_1fr] items-center">
          <article className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                The Founder
              </h2>
              <h3 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
                {settings.founderName}
              </h3>
            </div>
            <div className="space-y-6 text-lg font-light text-brand-textMuted leading-relaxed">
              {settings.founderStory.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </article>

          <article className="relative">
            <div className="absolute -inset-4 bg-brand-caramel/10 rounded-[40px] transform rotate-3"></div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-brand-border/40 bg-brand-warmWhite shadow-floating">
              <Image 
                src={founderImage} 
                alt="Founder portrait" 
                fill 
                sizes="(max-width: 1024px) 100vw, 45vw" 
                className="object-cover" 
              />
            </div>
          </article>
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Our Principles
            </h2>
            <h3 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              What We Stand For
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <article 
                key={value.title} 
                style={{ animationDelay: `${index * 100}ms` }}
                className="group p-8 rounded-[24px] border border-brand-border/50 bg-brand-cream/30 hover:bg-brand-warmWhite hover:border-brand-border hover:shadow-floating transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-brand-warmWhite border border-brand-border/50 flex items-center justify-center shadow-sm font-display text-xl text-brand-caramel font-semibold group-hover:scale-110 transition-transform duration-500">
                  0{index + 1}
                </div>
                <h4 className="mt-8 text-xl font-display text-brand-deepBrown group-hover:text-brand-caramel transition-colors">
                  {value.title}
                </h4>
                <p className="mt-3 text-brand-textMuted font-light leading-relaxed">
                  {value.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-cream border-t border-brand-border">
        <div className="content-shell space-y-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Journey
            </h2>
            <h3 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              Milestones
            </h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {settings.milestones.map((milestone) => (
              <article 
                key={`${milestone.year}-${milestone.label}`} 
                className="flex flex-col justify-center rounded-[24px] border border-brand-border/50 bg-brand-warmWhite p-8 shadow-sm hover:shadow-floating hover:border-brand-border transition-all duration-500"
              >
                <p className="font-display text-5xl text-brand-caramel">{milestone.year}</p>
                <div className="w-8 h-[1px] bg-brand-border my-6"></div>
                <p className="text-lg font-light text-brand-textBody leading-relaxed">{milestone.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite border-t border-brand-border">
        <div className="content-shell space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Studio
            </h2>
            <h3 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              Behind The Scenes
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {settings.galleryImageUrls.slice(0, 6).map((imageUrl, index) => (
              <article 
                key={`${imageUrl}-${index}`} 
                className="group relative aspect-square overflow-hidden rounded-[24px] bg-brand-cream"
              >
                <Image
                  src={imageUrl}
                  alt={`Flour Dude gallery ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-500 bg-brand-deepBrown/10 opacity-0 group-hover:opacity-100 mix-blend-multiply" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-deepBrown text-white">
        <div className="content-shell">
          <div className="max-w-4xl mx-auto text-center space-y-10 bg-brand-warmWhite/5 border border-white/10 rounded-[32px] p-10 md:p-16 backdrop-blur-md">
            <div className="space-y-4">
              <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                Experience Flour Dude
              </h2>
              <h3 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-tight">
                Ready to order?
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <Button className="rounded-pill px-8 h-14 bg-brand-warmWhite text-brand-deepBrown hover:bg-brand-caramel hover:text-white transition-all font-medium tracking-wide w-full">
                  Order on WhatsApp
                </Button>
              </a>
              <Link href="/cakes" className="w-full sm:w-auto">
                <Button className="rounded-pill px-8 h-14 border border-white/20 bg-transparent text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium tracking-wide w-full">
                  See Our Cakes →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
