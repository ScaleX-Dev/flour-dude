import Image from 'next/image';
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
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src={heroImages.cake}
          alt="Flour Dude custom cake close-up"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="content-shell relative z-10 flex h-full flex-col justify-center gap-4">
          <DisplayHeading className="max-w-4xl text-cream">Custom Cakes Made for Your Moments</DisplayHeading>
          <MutedText className="text-cream/85">
            Birthdays · Weddings · Corporate · Novelty · Any celebration
          </MutedText>
          <div>
            <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer">
              <Button variant="primary" size="lg">
                Order a Custom Cake
              </Button>
            </a>
          </div>
        </div>
      </section>

      <CakeFilter cakes={cakes} />
    </>
  );
}
