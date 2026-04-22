import Image from 'next/image';
import { Suspense } from 'react';
import { CakeFilter } from '@/components/cakes/CakeFilter';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { DisplayHeading, MutedText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { generateMetadata } from '@/lib/metadata';
import { getAllCakes } from '@/lib/payload';
import { buildWhatsAppLink, heroImages, whatsappMessages } from '@/lib/site';

export const metadata = generateMetadata({
  title: 'Custom Cakes Galle — Birthdays, Weddings & Events',
  description:
    'Order a custom cake in Galle from Flour Dude. Birthdays, weddings, corporate events. ⭐ 5-star rated. WhatsApp to order.',
  path: '/cakes'
});

export const revalidate = 60;

export default async function CakesPage() {
  const cakes = await getAllCakes();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Custom Cakes', path: '/cakes' }
  ]);

  return (
    <>
      <SchemaMarkup id="schema-breadcrumb-cakes" schema={breadcrumbSchema} />
      <section className="relative h-[480px] md:h-[540px] overflow-hidden bg-brand-deepBrown text-white flex flex-col justify-end pb-16 md:pb-24 pt-[calc(var(--header-height)+2.5rem)]">
        <Image
          src={heroImages.cake}
          alt="Flour Dude custom cake close-up"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 scale-105 animate-[ken-burns_30s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown via-brand-deepBrown/50 to-transparent" />

        <div className="content-shell relative z-10 w-full animate-rise-in">
          <div className="max-w-3xl space-y-6 pl-2 sm:pl-4 md:pl-8 lg:pl-10">
            <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Custom Cake Portfolio
            </p>
            <DisplayHeading className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-[80px] leading-[1] md:leading-[0.95] tracking-tighter">
              Custom Cakes for Every Celebration
            </DisplayHeading>
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-white/95">
              Birthdays, Weddings, and Special Events
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/80 max-w-xl">
              Handcrafted with premium imported ingredients, our custom cakes are designed to look elegant and taste exceptional.
            </p>
            <p className="text-base md:text-lg text-white/90">
              Have an idea or inspiration for a cake?{' '}
              <a
                href={buildWhatsAppLink(whatsappMessages.customCake)}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-brand-caramel transition-colors"
              >
                Share it with us on WhatsApp
              </a>
            </p>
            <div className="pt-4">
              <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer">
                <Button className="rounded-pill px-8 h-14 bg-brand-warmWhite text-brand-deepBrown hover:bg-brand-caramel hover:text-white transition-all font-medium tracking-wide">
                  Discuss A Custom Order
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <section className="bg-brand-cream">
          <CakeFilter cakes={cakes} />
        </section>
      </Suspense>
    </>
  );
}
