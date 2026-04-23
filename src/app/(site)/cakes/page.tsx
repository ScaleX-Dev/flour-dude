import Image from 'next/image';
import { Suspense } from 'react';
import { CakeFilter } from '@/components/cakes/CakeFilter';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { generateMetadata } from '@/lib/metadata';
import { getAllCakes } from '@/lib/payload';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

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
      <section className="relative min-h-[calc(520px+var(--header-height))] md:min-h-[calc(600px+var(--header-height))] bg-brand-deepBrown text-white flex flex-col justify-end pb-16 md:pb-24 pt-[calc(var(--header-height)+3rem)]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/cake-portfolio-2.jpg"
            alt="Flour Dude signature custom cake with strawberries"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55 scale-105 animate-[ken-burns_30s_ease-out_forwards]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deepBrown/90 via-brand-deepBrown/55 to-brand-deepBrown/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown/70 via-transparent to-brand-deepBrown/30" />

        <div className="relative z-10 w-full animate-rise-in px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-2xl space-y-5">
            <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Custom Cake Portfolio
            </p>
            <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              Custom Cakes for moments worth celebrating
            </h1>
            <h2 className="font-sans text-base sm:text-lg md:text-xl font-semibold tracking-tight text-white/90">
              Birthdays, Weddings, and Everything in Between
            </h2>
            <p className="text-base sm:text-lg font-light leading-relaxed text-white/75 max-w-xl">
              Carefully crafted for sharing with those you cherish, all our cakes are made using premium imported Italian ingredients for that unmistakable, velvety texture and elegant finish. Whether it&apos;s a grand milestone or an intimate &ldquo;thank you,&rdquo; we bake with gratitude in every layer.
            </p>
            <p className="text-sm sm:text-base text-white/80">
              Have an idea or inspiration for a cake?{' '}
              <a
                href={buildWhatsAppLink(whatsappMessages.customCake)}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-brand-caramel transition-colors font-medium"
              >
                Share it with us on WhatsApp
              </a>
            </p>
            <div className="pt-2">
              <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer">
                <Button className="rounded-pill px-8 h-13 min-h-[52px] bg-brand-caramel text-white hover:bg-brand-caramelLight transition-all font-medium tracking-wide shadow-lg">
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
