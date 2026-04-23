import Image from 'next/image';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { PromoCountdown } from '@/components/home/PromoCountdown';
import { ScrollIndicator } from '@/components/home/ScrollIndicator';
import { formatLKR, formatPriceDisplay } from '@/lib/formatting';
import { generateMetadata } from '@/lib/metadata';
import {
  getActivePromotion,
  getAllCakes,
  getFAQs,
  getHeroBanner,
  getMenuItems,
  getSiteSettingsData,
  getTestimonials
} from '@/lib/payload';
import {
  buildWhatsAppLink,
  cakePortfolio,
  faqs,
  galleryPhotos,
  heroImages,
  menuItems,
  siteConfig,
  testimonials,
  whatsappMessages
} from '@/lib/site';
import { WA } from '@/lib/whatsapp';

export const revalidate = 60;

const LANDING_H1 = "Galle's Most Loved Cafe & Custom Cake Studio";
const LANDING_H2 =
  "Proper coffee, fresh bakes, and celebration cakes made to order. Your own cozy corner to slow down and unwind - whether you're here for an hour or working all day.";
const LANDING_RATING_LINE =
  '5.0 on Uber Eats & Google Reviews | Loved by Southerners and visitors alike';

export const metadata = generateMetadata({
  title: "Galle's Most Loved Cafe & Custom Cake Studio",
  description:
    'Custom cakes, waffles, wraps & coffee in Galle. ⭐ 5.0 on Uber Eats. Order via WhatsApp. Open daily 8:30 AM – 9 PM.',
  path: '/'
});

type MediaLike = {
  url?: string | null;
};

type FeaturedMenuCard = {
  id: string;
  name: string;
  description: string;
  price?: number;
  badge?: string;
};

type CakeCard = {
  id: string;
  title: string;
  description: string;
  priceFrom?: number;
  askForPricing?: boolean;
  imageUrl: string;
  cardTone: string;
};

type TestimonialCard = {
  id: string;
  quote: string;
  customerName: string;
  occasion: string;
  rating: number;
  cardTone: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type PromoBanner = {
  title: string;
  body: string;
  endsAt?: string;
};

type HomePageData = {
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaHref: string;
  promo: PromoBanner | null;
  featuredMenu: FeaturedMenuCard[];
  cakeShowcase: CakeCard[];
  testimonialCards: TestimonialCard[];
  faqCards: FaqItem[];
  locationLabel: string;
};

function resolveMediaUrl(media?: number | MediaLike | null): string | null {
  if (!media || typeof media === 'number') {
    return null;
  }

  return media.url ?? null;
}

function isPromotionLive(startsAt?: string | null, endsAt?: string | null): boolean {
  const now = Date.now();
  const startMs = startsAt ? new Date(startsAt).getTime() : null;
  const endMs = endsAt ? new Date(endsAt).getTime() : null;

  if (startMs && Number.isFinite(startMs) && startMs > now) {
    return false;
  }

  if (endMs && Number.isFinite(endMs) && endMs < now) {
    return false;
  }

  return true;
}

async function getHomePageData(): Promise<HomePageData> {
  const toneClasses = ['bg-brand-cream', 'bg-brand-caramel/10', 'bg-brand-rose/10', 'bg-brand-warmWhite'];
  const fallbackFeaturedMenu: FeaturedMenuCard[] = menuItems
    .filter((item) => item.isFeatured)
    .slice(0, 3)
    .map((item, index) => ({
      id: `seed-menu-${index}`,
      name: item.name,
      description: item.description ?? 'Freshly made at Flour Dude.',
      price: item.price,
      badge: index === 0 ? 'Best Seller' : undefined
    }));

  const fallbackCakes: CakeCard[] = cakePortfolio.slice(0, 4).map((item, index) => ({
    id: `seed-cake-${index}`,
    title: item.title,
    description: item.description ?? 'Custom crafted for celebrations.',
    priceFrom: item.priceFrom ?? undefined,
    askForPricing: false,
    imageUrl: item.imageUrl,
    cardTone: toneClasses[index % toneClasses.length]
  }));

  const fallbackTestimonials: TestimonialCard[] = testimonials.slice(0, 6).map((item, index) => ({
    id: `seed-testimonial-${index}`,
    quote: item.message,
    customerName: item.customerName,
    occasion: index % 2 === 0 ? 'Birthday celebration' : 'Cafe order',
    rating: item.rating ?? 5,
    cardTone: toneClasses[index % toneClasses.length]
  }));

  const fallbackFaqs: FaqItem[] = faqs.slice(0, 4).map((item, index) => ({
    id: `seed-faq-${index}`,
    question: item.question,
    answer: typeof item.answer === 'string' ? item.answer : ''
  }));

  try {
    const [hero, settings, menuDocs, cakeDocs, testimonialDocs, activePromo, faqDocs] = await Promise.all([
      getHeroBanner(),
      getSiteSettingsData(),
      getMenuItems(),
      getAllCakes(),
      getTestimonials(10),
      getActivePromotion('homepage'),
      getFAQs()
    ]);

    const featuredMenu = menuDocs
      .filter((item) => Boolean(item.isFeatured ?? false))
      .slice(0, 3)
      .map((item, index) => ({
        id: String(item.id ?? `cms-menu-${index}`),
        name: String(item.name ?? 'Featured item'),
        description: String(item.description ?? 'Freshly made at Flour Dude.'),
        price:
          typeof item.price === 'number'
            ? item.price
            : typeof item.price_lkr === 'number'
              ? item.price_lkr
              : undefined,
        badge: index === 0 ? 'Best Seller' : undefined
      }));

    const cakes = cakeDocs
      .slice(0, 4)
      .map((item, index) => ({
        id: String(item.id ?? `cms-cake-${index}`),
        title: String(item.title ?? item.name ?? 'Signature Cake'),
        description: String(item.description ?? 'Custom crafted for celebrations.'),
        priceFrom:
          typeof item.starting_price === 'number'
            ? item.starting_price
            : typeof item.priceFrom === 'number'
              ? item.priceFrom
              : undefined,
        askForPricing: item.show_price === false,
        imageUrl:
          resolveMediaUrl(
            (Array.isArray(item.photos) ? item.photos[0]?.image : undefined) as
              | number
              | MediaLike
              | null
              | undefined
          ) ??
          resolveMediaUrl((item.image as number | MediaLike | null | undefined) ?? null) ??
          heroImages.cake,
        cardTone: toneClasses[index % toneClasses.length]
      }))
      .filter((item) => Boolean(item.title));

    const mappedTestimonials = testimonialDocs.slice(0, 6).map((item, index) => ({
      id: String(item.id ?? `cms-testimonial-${index}`),
      quote: String(item.message ?? item.quote ?? 'Loved every bite.'),
      customerName: String(item.customerName ?? item.customer_name ?? 'Happy customer'),
      occasion: index % 2 === 0 ? 'Custom cake order' : 'Cafe pickup',
      rating:
        typeof item.rating === 'number'
          ? Math.max(1, Math.min(5, item.rating))
          : typeof item.star_rating === 'string'
            ? Math.max(1, Math.min(5, Number(item.star_rating)))
            : 5,
      cardTone: toneClasses[index % toneClasses.length]
    }));

    const mappedFaqs = faqDocs.slice(0, 4).map((item, index) => ({
      id: String(item.id ?? `cms-faq-${index}`),
      question: String(item.question ?? 'How do I place an order?'),
      answer: String(item.answer ?? 'Message us on WhatsApp and we will guide you quickly.')
    }));

    return {
      heroHeadline: LANDING_H1,
      heroSubheadline: LANDING_H2,
      heroPrimaryCtaText: String(hero?.cta_1_text ?? 'Start Your Cake Order'),
      heroPrimaryCtaHref: WA.customCake(),
      promo: activePromo
        ? {
            title: String(activePromo.headline ?? activePromo.title ?? 'Limited-Time Offer'),
            body: String(activePromo.description ?? activePromo.body ?? 'Reserve your date now while slots are open.'),
            endsAt:
              typeof activePromo.expires_at === 'string'
                ? activePromo.expires_at
                : typeof activePromo.endsAt === 'string'
                  ? activePromo.endsAt
                  : undefined
          }
        : null,
      featuredMenu: featuredMenu.length ? featuredMenu : fallbackFeaturedMenu,
      cakeShowcase: cakes.length ? cakes : fallbackCakes,
      testimonialCards: mappedTestimonials.length ? mappedTestimonials : fallbackTestimonials,
      faqCards: mappedFaqs.length ? mappedFaqs : fallbackFaqs,
      locationLabel: String(settings.location ?? siteConfig.locations[0])
    };
  } catch {
    return {
      heroHeadline: LANDING_H1,
      heroSubheadline: LANDING_H2,
      heroPrimaryCtaText: 'Start Your Cake Order',
      heroPrimaryCtaHref: buildWhatsAppLink(whatsappMessages.customCake),
      promo: null,
      featuredMenu: fallbackFeaturedMenu,
      cakeShowcase: fallbackCakes,
      testimonialCards: fallbackTestimonials,
      faqCards: fallbackFaqs,
      locationLabel: siteConfig.locations[0]
    };
  }
}

export default async function SiteHomePage() {
  const data = await getHomePageData();
  const menuCategoryHighlights = [
    {
      title: 'All-Day Breakfast',
      items: 'Wraps, waffles, sandwiches, quesadilla and more'
    },
    {
      title: 'Cakes and Muffins',
      items: 'Fresh bakes for everyday cravings and celebrations'
    },
    {
      title: 'Brownies and Cookies',
      items: 'Fudgy brownies, chunky cookies, and dessert add-ons'
    },
    {
      title: 'Drinks',
      items: 'Hot coffee, cold coffee, matcha, iced tea, refreshers, frappes, and milkshakes'
    }
  ];
  const customCakeTestimonials =
    data.testimonialCards.filter(
      (item) =>
        item.occasion.toLowerCase().includes('custom') ||
        item.occasion.toLowerCase().includes('cake') ||
        item.quote.toLowerCase().includes('cake')
    ).slice(0, 2) || [];
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Bakery',
      name: 'Flour Dude',
      url: 'https://flourdude.lk'
    },
    ratingValue: '5.0',
    reviewCount: '140'
  };

  return (
    <>
      <SchemaMarkup id="schema-home-aggregate-rating" schema={aggregateRatingSchema} />

      {/* ───── HERO ───── */}
      <section className="relative min-h-[92svh] sm:min-h-[95vh] overflow-hidden bg-brand-deepBrown text-white flex flex-col">
        <Image
          src={heroImages.cake}
          alt="Signature Flour Dude celebration cake"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-[ken-burns_20s_ease-out_forwards]"
        />
        {/* Gradient: strong on left for text legibility, fades out right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deepBrown/95 via-brand-deepBrown/50 to-brand-deepBrown/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown/60 via-transparent to-brand-deepBrown/30" />

        <div className="relative z-10 flex w-full flex-1 items-end justify-start pb-20 md:pb-32 pt-[calc(var(--header-height)+2rem)] px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-xl w-full space-y-6 animate-rise-in text-left">
            {/* Location pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 py-2 px-4 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-caramel opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-caramel" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/80">
                {data.locationLabel} · Open Daily
              </span>
            </div>

            <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              {data.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg font-light leading-relaxed text-white/75 max-w-md">
              {data.heroSubheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <a
                href={data.heroPrimaryCtaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill px-7 h-13 min-h-[52px] bg-brand-caramel text-white font-medium tracking-wide text-sm hover:bg-brand-caramelLight transition-all duration-300 shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Zm-8.35 18.13h-.01a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.81 1.1 1.11-3.71-.24-.38a9.83 9.83 0 01-1.5-5.2c0-5.44 4.42-9.86 9.86-9.86 2.63 0 5.1 1.03 6.97 2.9a9.77 9.77 0 012.88 6.96c0 5.43-4.43 9.85-9.87 9.85Z" />
                </svg>
                {data.heroPrimaryCtaText}
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-pill px-7 min-h-[52px] border border-white/25 bg-white/5 text-white font-medium tracking-wide text-sm hover:bg-white hover:text-brand-deepBrown transition-all duration-300 backdrop-blur-sm"
              >
                View Menu
              </Link>
            </div>

            {/* Rating badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 py-2 px-4 backdrop-blur-md">
              <span className="text-brand-caramel text-base leading-none">★★★★★</span>
              <span className="text-[11px] font-medium tracking-wide text-white/70">
                5.0 · 140+ verified reviews · Uber Eats
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <ScrollIndicator />
        </div>
      </section>

      {/* ───── MARQUEE TICKER ───── */}
      <div className="overflow-hidden bg-brand-deepBrown border-t border-white/8 py-3 select-none" aria-hidden="true">
        <div className="animate-marquee flex gap-0 whitespace-nowrap">
          {[0, 1].map((dupe) => (
            <span key={dupe} className="flex shrink-0 items-center text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/40">
              {['Open Daily 8:30 AM – 9:00 PM', 'Custom Celebration Cakes', '5.0 ★ Uber Eats', 'Galle · Sri Lanka', 'WhatsApp to Order', 'Custom Cakes · Waffles · Coffee', 'B2B & Event Catering', '140+ Verified Reviews'].map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-6">{item}</span>
                  <span className="text-brand-caramel/60">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ───── PROMO BANNER (conditional) ───── */}
      {data.promo ? (
        <section className="bg-brand-caramel/12 border-b border-brand-caramel/20 relative overflow-hidden">
          <div className="content-shell py-10 md:py-14">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                  Limited-Time Offer
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deepBrown">
                  {data.promo.title}
                </h2>
                <p className="text-brand-textMuted font-light max-w-lg">{data.promo.body}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                {data.promo.endsAt ? <PromoCountdown expiresAt={data.promo.endsAt} /> : null}
                <a
                  href={WA.customCake()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-pill px-7 h-12 bg-brand-caramel text-white hover:bg-brand-deepBrown transition-all font-medium text-sm whitespace-nowrap"
                >
                  Claim via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ───── FOOD PHOTOGRAPHY STRIP ───── */}
      <section className="bg-brand-cream py-8 overflow-hidden" aria-label="Food photography">
        <div
          className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
          style={{ paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2 + 1.5rem))' }}
        >
          {galleryPhotos.slice(0, 12).map((src, i) => (
            <div
              key={i}
              className={`relative flex-shrink-0 overflow-hidden rounded-2xl snap-start ${
                i % 4 === 0
                  ? 'w-44 h-64 sm:w-52 sm:h-72'
                  : i % 4 === 1
                    ? 'w-52 h-64 sm:w-60 sm:h-72'
                    : i % 4 === 2
                      ? 'w-36 h-64 sm:w-44 sm:h-72'
                      : 'w-48 h-64 sm:w-56 sm:h-72'
              }`}
            >
              <Image
                src={src}
                alt={`Flour Dude food photography ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="240px"
              />
            </div>
          ))}
          {/* Right padding spacer */}
          <div className="flex-shrink-0 w-4 sm:w-8" />
        </div>
      </section>

      {/* ───── MENU HIGHLIGHTS ───── */}
      <section className="section-space bg-brand-cream border-t border-brand-border/50">
        <div className="content-shell space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-caramel">
                All-Day Menu
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-deepBrown tracking-tight leading-[1.05]">
                Fresh from our kitchen, every day.
              </h2>
              <p className="text-brand-textMuted font-light text-base sm:text-lg leading-relaxed">
                All-day breakfast, fresh bakes, proper coffee, and waffles. Everything made fresh, every day.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-pill px-6 h-11 border border-brand-deepBrown/20 text-brand-deepBrown text-sm font-medium hover:bg-brand-deepBrown hover:text-white transition-all shrink-0"
            >
              Full Menu →
            </Link>
          </div>

          {/* Food photo feature cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                src: '/images/menu-feature-waffle.jpg',
                label: 'Waffles & Sweets',
                desc: 'Messy Waffle, French Toast & more',
                from: 'From LKR 900'
              },
              {
                src: '/images/menu-feature-cheesecake.jpg',
                label: 'Cakes & Muffins',
                desc: 'Matilda Choc Fudge, Cheesecake & more',
                from: 'From LKR 550'
              },
              {
                src: '/images/menu-feature-savory.jpg',
                label: 'All-Day Savory',
                desc: 'Wraps, Sandwiches, Quesadilla & more',
                from: 'From LKR 900'
              }
            ].map((feature) => (
              <Link
                key={feature.label}
                href="/menu"
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl block"
              >
                <Image
                  src={feature.src}
                  alt={feature.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown/90 via-brand-deepBrown/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-display text-xl sm:text-2xl leading-tight">{feature.label}</p>
                  <p className="text-white/60 text-xs mt-1">{feature.desc}</p>
                  <p className="text-brand-caramel text-xs font-semibold tracking-wide uppercase mt-2">
                    {feature.from}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Drinks row */}
          <div className="rounded-2xl border border-brand-border/50 bg-brand-warmWhite p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 space-y-2">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-caramel">Drinks Menu</p>
              <h3 className="font-display text-2xl sm:text-3xl text-brand-deepBrown">
                Hot · Cold · Matcha · Frappes · Milkshakes
              </h3>
              <p className="text-brand-textMuted font-light text-sm sm:text-base">
                Espresso drinks, iced teas, refreshers, matcha, and milkshakes. Something for everyone.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-pill px-6 h-11 bg-brand-deepBrown text-white text-sm font-medium hover:bg-brand-caramel transition-all shrink-0"
            >
              View Drinks →
            </Link>
          </div>

          {/* Featured items from CMS */}
          {data.featuredMenu.length > 0 && (
            <div className="space-y-4">
              <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-textMuted">
                Chef&apos;s picks
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.featuredMenu.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl border border-brand-border/40 bg-brand-warmWhite p-4 hover:shadow-soft transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-2xl shrink-0">
                      🍽
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-brand-deepBrown text-sm leading-snug truncate">{item.name}</p>
                      <p className="text-brand-textMuted text-xs mt-0.5 line-clamp-1">{item.description}</p>
                    </div>
                    <p className="text-brand-caramel font-semibold text-sm shrink-0">
                      {item.price ? formatLKR(item.price) : 'Ask'}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───── CUSTOM CAKES (dark) ───── */}
      <section className="section-space relative overflow-hidden bg-brand-deepBrown text-white">
        <div className="absolute inset-y-0 right-0 w-full md:w-[48%]">
          <Image
            src={heroImages.celebration}
            alt="Bespoke custom celebration cake"
            fill
            className="object-cover opacity-30 md:opacity-100"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deepBrown via-brand-deepBrown/70 to-transparent md:via-brand-deepBrown/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown/40 to-transparent" />
        </div>

        <div className="content-shell relative z-10">
          <div className="max-w-[520px] space-y-8">
            <div className="space-y-4">
              <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-caramel">
                Custom Cake Studio
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
                A cake made just for you.
              </h2>
              <p className="text-base sm:text-lg font-light leading-relaxed text-white/70 max-w-md">
                Birthdays, weddings, bridal showers, anniversaries, graduations — we design every cake from scratch around your vision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/cakes"
                className="inline-flex items-center justify-center rounded-pill px-7 min-h-[52px] bg-brand-caramel text-white font-medium text-sm hover:bg-brand-caramelLight transition-all"
              >
                View Portfolio
              </Link>
              <a
                href={WA.customCake()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill px-7 min-h-[52px] border border-white/20 text-white font-medium text-sm hover:bg-white hover:text-brand-deepBrown transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Mini testimonials */}
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              {(customCakeTestimonials.length
                ? customCakeTestimonials
                : data.testimonialCards.slice(0, 2)
              ).map((item) => (
                <article
                  key={`custom-${item.id}`}
                  className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
                >
                  <p className="text-brand-caramel text-xs">{'★'.repeat(Math.max(1, Math.min(5, item.rating)))}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75 line-clamp-3">
                    &quot;{item.quote}&quot;
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-white/40">{item.customerName}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="section-space bg-brand-cream">
        <div className="content-shell space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-caramel">
                Reviews
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-brand-deepBrown tracking-tight leading-tight">
                What our guests say.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-brand-warmWhite px-4 py-2 shadow-sm border border-brand-border/50 shrink-0">
              <span className="text-brand-caramel text-base leading-none">★★★★★</span>
              <span className="font-medium text-brand-deepBrown text-sm">{siteConfig.ratingLabel}</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.testimonialCards.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-2xl bg-brand-warmWhite p-6 border border-brand-border/40 shadow-sm hover:shadow-soft transition-all duration-300"
              >
                <div>
                  <div className="text-brand-caramel text-sm mb-4">
                    {'★'.repeat(Math.max(1, Math.min(5, item.rating)))}
                  </div>
                  {/* Big quote mark */}
                  <div className="font-display text-5xl text-brand-caramel/20 leading-none mb-2 select-none">&ldquo;</div>
                  <p className="text-base font-light leading-relaxed text-brand-textBody">
                    {item.quote}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-brand-border/40 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-caramel/15 flex items-center justify-center font-display text-lg text-brand-caramel font-bold shrink-0">
                    {item.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-brand-deepBrown leading-snug">
                      {item.customerName}
                    </p>
                    <p className="text-[11px] text-brand-textMuted uppercase tracking-wider mt-0.5">
                      {item.occasion}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FINAL WHATSAPP CTA ───── */}
      <section className="section-space bg-brand-deepBrown">
        <div className="content-shell">
          <div className="max-w-3xl mx-auto text-center space-y-7">
            <div className="space-y-4">
              <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-caramel">
                Ready to Order?
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
                Let&apos;s make something delicious.
              </h2>
              <p className="text-white/60 font-light text-base sm:text-lg max-w-xl mx-auto">
                Custom cakes. Fresh waffles. Cafe drinks. Events. Whatever you&apos;re in the mood for, message us on WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={WA.customCake()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-pill px-8 min-h-[56px] w-full sm:w-auto bg-[#25D366] text-white font-medium hover:bg-[#1ebe5d] transition-all tracking-wide text-sm shadow-xl"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
                  <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
                </svg>
                Order via WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-pill px-8 min-h-[56px] w-full sm:w-auto border border-white/20 text-white font-medium text-sm hover:bg-white hover:text-brand-deepBrown transition-all"
              >
                Find Us in Galle
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[11px] font-medium text-white/35 uppercase tracking-widest">
              <span>Open Daily 8:30 AM – 9:00 PM</span>
              <span className="text-brand-caramel/40">✦</span>
              <span>Bandara Mawatha, Galle</span>
              <span className="text-brand-caramel/40">✦</span>
              <span>No Checkout Needed</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
