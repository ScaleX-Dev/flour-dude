import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DisplayHeading, Eyebrow, SectionHeading, MutedText } from '@/components/ui/Typography';
import { getSiteSettingsData } from '@/lib/payload';
import { buildWhatsAppLink, heroImages, whatsappMessages } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Flour Dude',
  description: 'Founder-led handcrafted cake studio and cafe in Galle, Sri Lanka.'
};

const values = [
  {
    emoji: '🌿',
    title: 'Quality Ingredients',
    body: 'Locally sourced where possible'
  },
  {
    emoji: '☀️',
    title: 'Made Fresh Daily',
    body: 'Baked every morning, never day-old'
  },
  {
    emoji: '🎨',
    title: 'Custom Designs',
    body: 'Every cake designed from scratch'
  },
  {
    emoji: '❤️',
    title: 'Community First',
    body: 'Proudly serving Galle since day one'
  }
];

export default async function AboutPage() {
  const settings = await getSiteSettingsData();
  const founderImage = settings.founderPhotoUrl ?? heroImages.celebration;

  return (
    <>
      <section className="relative min-h-[420px] overflow-hidden bg-brown-deep">
        <Image src={founderImage} alt="Founder of Flour Dude" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />

        <div className="content-shell relative z-10 flex min-h-[420px] items-end pb-12">
          <DisplayHeading className="max-w-4xl text-cream">Baked with Love in Galle</DisplayHeading>
        </div>
      </section>

      <section className="section-space bg-warmWhite">
        <div className="content-shell grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <article className="space-y-4">
            <Eyebrow>Our Story</Eyebrow>
            <SectionHeading>{settings.founderName}</SectionHeading>
            <div className="space-y-3">
              {settings.founderStory.map((paragraph) => (
                <MutedText key={paragraph}>{paragraph}</MutedText>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-cake border border-borderColor bg-cream p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-cake">
              <Image src={founderImage} alt="Founder portrait" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </article>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell grid grid-cols-2 gap-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-card border border-borderColor bg-warmWhite p-5">
              <p className="text-4xl">{value.emoji}</p>
              <h2 className="mt-3 text-base font-bold text-brown-deep">{value.title}</h2>
              <p className="mt-1 text-sm text-textMuted">{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-warmWhite">
        <div className="content-shell space-y-6">
          <SectionHeading>Milestones</SectionHeading>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {settings.milestones.map((milestone) => (
              <article key={`${milestone.year}-${milestone.label}`} className="flex-1 rounded-card border border-borderColor bg-cream p-4">
                <p className="font-display text-3xl text-caramel">{milestone.year}</p>
                <p className="mt-2 text-sm text-textMuted">{milestone.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell grid grid-cols-2 gap-3 md:grid-cols-3">
          {settings.galleryImageUrls.slice(0, 6).map((imageUrl, index) => (
            <article key={`${imageUrl}-${index}`} className="group relative overflow-hidden rounded-cake">
              <Image
                src={imageUrl}
                alt={`Flour Dude gallery ${index + 1}`}
                width={900}
                height={900}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-brown-deep text-center text-warmWhite">
        <div className="content-shell space-y-4">
          <SectionHeading className="text-warmWhite">Ready to order?</SectionHeading>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="lg">
                Order on WhatsApp
              </Button>
            </a>
            <Link href="/cakes">
              <Button variant="outline" className="border-warmWhite text-warmWhite hover:bg-warmWhite/10 hover:text-warmWhite">
                See Our Cakes →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
