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

export default async function MenuPage({
  searchParams
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialTab = resolvedParams?.tab;
  const { categories, items, specialBanner, settings } = await getPageData();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' }
  ]);

  return (
    <>
      <SchemaMarkup id="schema-breadcrumb-menu" schema={breadcrumbSchema} />
      <section className="relative h-[calc(480px+var(--header-height))] md:h-[calc(540px+var(--header-height))] overflow-hidden bg-brand-deepBrown text-white flex flex-col justify-end pb-16 md:pb-24 pt-[calc(var(--header-height)+2.5rem)]">
        <Image
          src={heroImages.waffle}
          alt="Close-up Flour Dude menu items"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55 scale-105 animate-[ken-burns_30s_ease-in-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown via-brand-deepBrown/50 to-transparent" />

        <div className="relative z-10 w-full animate-rise-in px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
              Daily Fresh Selection
            </h1>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-tighter text-white leading-tight">
              Our Menu.
            </h2>
            <p className="text-base sm:text-lg font-light leading-relaxed text-white/80 max-w-xl">
              All-day breakfast, cakes and muffins, brownies and cookies, plus cafe-style drinks including hot coffee, cold coffee, matcha, iced teas, refreshers, frappes, and milkshakes.
            </p>

            <div id="menu-hero-ctas" className="max-w-[500px] pt-4">
              <DeliveryOrderButtons
                uberEatsUrl={settings.uberEatsUrl}
                pickMeUrl={settings.pickMeUrl}
                placement="hero"
              />
            </div>
          </div>
        </div>
      </section>

      {specialBanner ? (
        <section className="bg-brand-caramel/10 border-b border-brand-caramel/20 py-4 text-center text-sm font-medium text-brand-deepBrown tracking-wide">
          <div className="content-shell flex items-center justify-center gap-3">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-caramel opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-caramel"></span>
             </span>
             Today&apos;s Special: <span className="font-semibold">{specialBanner.headline}</span> — {formatLKR(specialBanner.price)}
          </div>
        </section>
      ) : null}

      <section className="bg-brand-warmWhite border-b border-brand-border">
        <div className="content-shell py-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-brand-border/40 bg-brand-cream/40 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-brand-caramel font-semibold">1</p>
            <h3 className="mt-2 font-display text-2xl text-brand-deepBrown">All-Day Breakfast</h3>
            <p className="mt-2 text-sm font-light text-brand-textMuted">Wraps, waffles, sandwiches, quesadilla and more.</p>
          </article>
          <article className="rounded-2xl border border-brand-border/40 bg-brand-cream/40 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-brand-caramel font-semibold">2</p>
            <h3 className="mt-2 font-display text-2xl text-brand-deepBrown">Cakes and Muffins</h3>
            <p className="mt-2 text-sm font-light text-brand-textMuted">Freshly baked classics and seasonal specials.</p>
          </article>
          <article className="rounded-2xl border border-brand-border/40 bg-brand-cream/40 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-brand-caramel font-semibold">3</p>
            <h3 className="mt-2 font-display text-2xl text-brand-deepBrown">Brownies and Cookies</h3>
            <p className="mt-2 text-sm font-light text-brand-textMuted">Fudgy, chewy, and perfect with coffee.</p>
          </article>
          <article className="rounded-2xl border border-brand-border/40 bg-brand-cream/40 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-brand-caramel font-semibold">4</p>
            <h3 className="mt-2 font-display text-2xl text-brand-deepBrown">Drinks</h3>
            <p className="mt-2 text-sm font-light text-brand-textMuted">A cafe lineup inspired by your favorite coffeehouse selections.</p>
          </article>
        </div>
      </section>

      <div className="bg-brand-cream">
        <MenuCatalogClient
          categories={categories}
          items={items}
          uberEatsUrl={settings.uberEatsUrl}
          pickMeUrl={settings.pickMeUrl}
          heroCtaId="menu-hero-ctas"
          initialTab={initialTab}
        />
      </div>

      <section className="py-24 bg-brand-warmWhite border-t border-brand-border text-center">
        <div className="content-shell max-w-3xl mx-auto space-y-8">
          <h2 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
            Planning a celebration?
          </h2>
          <p className="text-brand-textMuted font-light text-lg">
            We make breathtaking custom cakes for weddings, birthdays, and corporate events. Explore our portfolio to find your style.
          </p>
          <div className="pt-4">
            <Link href="/cakes" className="group inline-flex items-center gap-2 font-sans font-medium text-brand-deepBrown border-b border-brand-deepBrown pb-1 hover:text-brand-caramel hover:border-brand-caramel transition-colors">
              Explore Cake Portfolio <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
