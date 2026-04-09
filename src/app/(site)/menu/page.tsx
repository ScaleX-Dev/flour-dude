import Image from 'next/image';
import Link from 'next/link';
import { DisplayHeading, Eyebrow, MutedText, SectionHeading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { DeliveryOrderButtons, MenuCatalogClient } from '@/components/menu/MenuCatalogClient';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { formatLKR } from '@/lib/formatting';
import { generateMetadata } from '@/lib/metadata';
import { getActivePromotion, getMenuCategories, getMenuItems, getSiteSettingsData } from '@/lib/payload';
import { heroImages } from '@/lib/site';

export const metadata = generateMetadata({
  title: 'Menu — Cakes, Waffles, Coffee & More',
  description:
    'Browse the full Flour Dude menu in Galle. Order on Uber Eats or PickMe. Fresh daily from LKR 550.',
  path: '/menu'
});

export const revalidate = 60;

type PromoBanner = {
  headline: string;
  price: number;
};

type SiteSettingsData = {
  uberEatsUrl: string;
  pickMeUrl: string;
};

function isLivePromotion(startsAt?: string | null, endsAt?: string | null): boolean {
  const now = Date.now();
  const start = startsAt ? new Date(startsAt).getTime() : null;
  const end = endsAt ? new Date(endsAt).getTime() : null;

  if (start && Number.isFinite(start) && start > now) {
    return false;
  }

  if (end && Number.isFinite(end) && end < now) {
    return false;
  }

  return true;
}

async function getPageData() {
  const [categories, items, siteSettings, menuPromo] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
    getSiteSettingsData(),
    getActivePromotion('menu')
  ]);

  let specialBanner: PromoBanner | null = null;

  if (menuPromo) {
    const promoStartsAt =
      typeof menuPromo.startsAt === 'string'
        ? menuPromo.startsAt
        : typeof menuPromo.expires_at === 'string'
          ? undefined
          : null;
    const promoEndsAt =
      typeof menuPromo.endsAt === 'string'
        ? menuPromo.endsAt
        : typeof menuPromo.expires_at === 'string'
          ? menuPromo.expires_at
          : null;

    const promoPrice =
      typeof (menuPromo as unknown as { price?: number }).price === 'number'
        ? (menuPromo as unknown as { price: number }).price
        : typeof (menuPromo as unknown as { special_price?: number }).special_price === 'number'
          ? (menuPromo as unknown as { special_price: number }).special_price
          : null;

    const promoHeadline =
      typeof menuPromo.headline === 'string'
        ? menuPromo.headline
        : typeof menuPromo.title === 'string'
          ? menuPromo.title
          : null;

    if (promoHeadline && promoPrice !== null && isLivePromotion(promoStartsAt, promoEndsAt)) {
      specialBanner = {
        headline: promoHeadline,
        price: promoPrice
      };
    }
  }

  const settings: SiteSettingsData = {
    uberEatsUrl: siteSettings.uberEatsUrl,
    pickMeUrl: siteSettings.pickMeUrl
  };

  return {
    categories,
    items,
    specialBanner,
    settings
  };
}

export default async function MenuPage() {
  const { categories, items, specialBanner, settings } = await getPageData();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' }
  ]);

  return (
    <>
      <SchemaMarkup id="schema-breadcrumb-menu" schema={breadcrumbSchema} />
      <section className="relative h-[280px] overflow-hidden bg-brown-deep">
        <Image
          src={heroImages.waffle}
          alt="Close-up Flour Dude menu items"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-brown-deep/85" />

        <div className="content-shell relative z-10 flex h-full flex-col justify-center gap-4 py-8">
          <Eyebrow className="text-caramel-light">Daily Fresh Selection</Eyebrow>
          <DisplayHeading className="text-cream">Our Menu</DisplayHeading>
          <MutedText className="text-cream/80">Made fresh every morning in Galle</MutedText>

          <div id="menu-hero-ctas" className="max-w-[780px] pt-2">
            <DeliveryOrderButtons
              uberEatsUrl={settings.uberEatsUrl}
              pickMeUrl={settings.pickMeUrl}
              placement="hero"
            />
          </div>
        </div>
      </section>

      {specialBanner ? (
        <section className="bg-caramel py-2.5 text-center text-sm font-medium text-white">
          <div className="content-shell">Today&apos;s Special: {specialBanner.headline} — {formatLKR(specialBanner.price)}</div>
        </section>
      ) : null}

      <MenuCatalogClient
        categories={categories}
        items={items}
        uberEatsUrl={settings.uberEatsUrl}
        pickMeUrl={settings.pickMeUrl}
        heroCtaId="menu-hero-ctas"
      />

      <section className="bg-cream py-14 text-center">
        <div className="content-shell space-y-4">
          <SectionHeading>Planning a celebration? We make custom cakes for every occasion. 🎂</SectionHeading>
          <Link href="/cakes" className="inline-flex">
            <Button variant="primary">See Custom Cakes →</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
