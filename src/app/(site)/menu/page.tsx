import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DisplayHeading, Eyebrow, MutedText, SectionHeading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { DeliveryOrderButtons, MenuCatalogClient } from '@/components/menu/MenuCatalogClient';
import { getMenuCategories, getMenuItems, getPayloadClient } from '@/lib/payload';
import { heroImages } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Menu | Flour Dude',
  description: 'Browse cakes, waffles, wraps, coffee, and drinks from Flour Dude in Galle.'
};

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
  const [categories, items] = await Promise.all([getMenuCategories(), getMenuItems()]);

  let specialBanner: PromoBanner | null = null;
  let settings: SiteSettingsData = {
    uberEatsUrl: 'https://www.ubereats.com',
    pickMeUrl: 'https://pickme.lk/food'
  };

  try {
    const payload = await getPayloadClient();

    const [promoRes, settingsRes] = await Promise.allSettled([
      payload.find({ collection: 'promotions', limit: 20, sort: '-createdAt' }),
      payload.findGlobal({ slug: 'site-settings' })
    ]);

    if (settingsRes.status === 'fulfilled') {
      const result = settingsRes.value as Record<string, unknown>;
      settings = {
        uberEatsUrl:
          typeof result.uberEatsUrl === 'string' && result.uberEatsUrl.trim().length
            ? result.uberEatsUrl
            : settings.uberEatsUrl,
        pickMeUrl:
          typeof result.pickMeUrl === 'string' && result.pickMeUrl.trim().length
            ? result.pickMeUrl
            : settings.pickMeUrl
      };
    }

    if (promoRes.status === 'fulfilled') {
      const promos = (promoRes.value.docs as Array<Record<string, unknown>>) ?? [];

      const menuPromo = promos.find((promo) => {
        const bannerType = promo.banner_type ?? promo.bannerType;
        const isMenuBanner = typeof bannerType === 'string' && bannerType.toLowerCase() === 'menu';
        const isActive = promo.active !== false;
        const startsAt = typeof promo.startsAt === 'string' ? promo.startsAt : null;
        const endsAt = typeof promo.endsAt === 'string' ? promo.endsAt : null;

        return isMenuBanner && isActive && isLivePromotion(startsAt, endsAt);
      });

      if (menuPromo && typeof menuPromo.title === 'string') {
        const promoPrice =
          typeof menuPromo.price === 'number'
            ? menuPromo.price
            : typeof menuPromo.special_price === 'number'
              ? menuPromo.special_price
              : null;

        if (promoPrice !== null) {
          specialBanner = {
            headline: menuPromo.title,
            price: promoPrice
          };
        }
      }
    }
  } catch {
    // Keep graceful defaults when CMS is unavailable.
  }

  return {
    categories,
    items,
    specialBanner,
    settings
  };
}

export default async function MenuPage() {
  const { categories, items, specialBanner, settings } = await getPageData();

  return (
    <>
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
          <div className="content-shell">Today&apos;s Special: {specialBanner.headline} — LKR {new Intl.NumberFormat('en-LK').format(specialBanner.price)}</div>
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
