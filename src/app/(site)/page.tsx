import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BodyText, DisplayHeading, Eyebrow, MutedText, SectionHeading } from '@/components/ui/Typography';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { PromoCountdown } from '@/components/home/PromoCountdown';
import { ScrollIndicator } from '@/components/home/ScrollIndicator';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
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
  heroImages,
  menuItems,
  siteConfig,
  testimonials,
  whatsappMessages
} from '@/lib/site';
import { WA } from '@/lib/whatsapp';

export const revalidate = 60;

export const metadata = generateMetadata({
  title: "Galle's Most Celebrated Cakes & Cafe",
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
  const toneClasses = ['bg-cream', 'bg-[#f8ede0]', 'bg-[#f4e8de]', 'bg-[#f7efe7]'];
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
      heroHeadline: String(hero?.headline ?? 'Custom Cakes That Look Like Art And Taste Even Better.'),
      heroSubheadline: String(
        hero?.sub_headline ??
          'Flour Dude blends cafe comfort with celebration baking. Message us on WhatsApp and we will help you choose the perfect order.'
      ),
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
      heroHeadline: 'Custom Cakes That Look Like Art And Taste Even Better.',
      heroSubheadline:
        'Flour Dude blends cafe comfort with celebration baking. Message us on WhatsApp and we will help you choose the perfect order.',
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
      <section className="relative min-h-[95vh] overflow-hidden bg-brand-deepBrown text-white flex flex-col justify-end pb-24 md:pb-32 pt-32">
        <Image
          src={heroImages.cake}
          alt="Signature Flour Dude celebration cake"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 animate-[ken-burns_20s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown via-brand-deepBrown/60 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="content-shell relative z-10 w-full">
          <div className="max-w-4xl space-y-8 animate-rise-in">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-brand-warmWhite/10 py-2 px-5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-caramel opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-caramel"></span>
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">
                {data.locationLabel}
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-[88px] text-white tracking-tighter leading-[0.95]">
              {data.heroHeadline}
            </h1>
            
            <p className="max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/80">
              {data.heroSubheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Button asChild className="rounded-pill px-8 h-14 bg-brand-caramel text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all duration-300 font-medium tracking-wide w-full sm:w-auto">
                <a href={data.heroPrimaryCtaHref} target="_blank" rel="noreferrer">
                  {data.heroPrimaryCtaText}
                </a>
              </Button>
              <Button asChild className="rounded-pill px-8 h-14 border border-white/30 bg-transparent text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all duration-300 font-medium tracking-wide w-full sm:w-auto">
                <Link href="/menu">
                  Explore Menu
                </Link>
              </Button>
            </div>

            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-brand-warmWhite/10 py-2.5 px-5 backdrop-blur-md">
              <span className="text-brand-caramel text-lg">★</span>
              <span className="text-sm font-medium tracking-wide text-white">Rated 5 stars on Uber Eats</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <ScrollIndicator />
        </div>
      </section>

      {data.promo ? (
        <section className="bg-brand-sage text-brand-deepBrown border-y border-brand-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="content-shell py-12 md:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                  Exclusive Offer
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight text-white">
                  {data.promo.title}
                </h2>
                <p className="text-brand-deepBrown/80 font-light text-lg max-w-2xl mx-auto lg:mx-0">
                  {data.promo.body}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0 bg-brand-warmWhite/30 p-6 rounded-3xl border border-brand-deepBrown/10 backdrop-blur-sm">
                {data.promo.endsAt ? <PromoCountdown expiresAt={data.promo.endsAt} /> : null}
                <div className="hidden sm:block w-[1px] h-12 bg-brand-warmWhite/20"></div>
                <Button asChild className="rounded-pill px-8 h-12 bg-brand-deepBrown text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium whitespace-nowrap">
                   <a href={WA.customCake()}>Claim on WhatsApp</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-space bg-brand-cream">
        <div className="content-shell space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brand-border pb-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                All-Day Menu
              </h2>
              <h3 className="section-title mb-0">Breakfast, Bakes, and Cafe Drinks</h3>
              <p className="text-brand-textMuted font-light text-lg leading-relaxed">
                Cafe-style favorites inspired by the drinks and comfort lineup people love, made fresh daily in Galle.
              </p>
            </div>
            <Button asChild className="rounded-pill px-6 h-12 border border-brand-deepBrown/20 bg-transparent text-brand-deepBrown hover:bg-brand-deepBrown hover:text-white transition-all">
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menuCategoryHighlights.map((category) => (
              <article
                key={category.title}
                className="rounded-[24px] border border-brand-border/40 bg-brand-warmWhite p-6 shadow-sm"
              >
                <h4 className="font-display text-2xl text-brand-deepBrown">{category.title}</h4>
                <p className="mt-3 font-light text-brand-textMuted leading-relaxed">{category.items}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {data.featuredMenu.map((item) => (
              <article 
                key={item.id} 
                className="group relative flex flex-col justify-between rounded-card bg-brand-warmWhite p-8 border border-transparent hover:border-brand-border/80 shadow-sm hover:shadow-floating transition-all duration-500"
              >
                <div className="space-y-4">
                  {item.badge ? (
                    <span className="inline-flex items-center rounded-full bg-brand-caramel/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-caramel uppercase">
                      {item.badge}
                    </span>
                  ) : null}
                  <h4 className="font-display text-2xl text-brand-deepBrown group-hover:text-brand-caramel transition-colors">
                    {item.name}
                  </h4>
                  <p className="font-light text-brand-textMuted leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-10 pt-6 border-t border-brand-border/40 flex items-center justify-between">
                  <p className="font-sans text-lg font-medium text-brand-deepBrown">
                    {formatLKR(item.price ?? 0)}
                  </p>
                  <span className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-brand-deepBrown group-hover:bg-brand-caramel group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space relative overflow-hidden bg-brand-deepBrown text-white">
        <div className="absolute inset-y-0 right-0 w-full md:w-[45%] opacity-20 md:opacity-100">
           <Image
              src={heroImages.celebration}
              alt="Bespoke Cake Design"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deepBrown via-brand-deepBrown/80 to-transparent" />
        </div>

        <div className="content-shell relative z-10">
          <div className="max-w-2xl space-y-10">
            <div className="space-y-6">
              <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                Custom Cakes
              </p>
              <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-[1.1] text-white">
                Customised cakes for every celebration.
              </h2>
              <p className="text-lg font-light leading-relaxed text-brand-deepBrown/80 max-w-xl">
                Birthdays, anniversaries, bridal showers, weddings, graduations, office milestones, and more. We design around your theme and guide you to the right size, flavor, and style.
              </p>
              <p className="text-sm uppercase tracking-[0.18em] text-white/60">
                Portfolio-led ordering flow: view designs, then enquire on WhatsApp.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 pt-4">
               <Button asChild className="rounded-pill px-8 h-14 bg-brand-caramel text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium w-full text-base">
                  <Link href="/cakes">View Portfolio</Link>
               </Button>
               <Button asChild className="rounded-pill px-8 h-14 border border-white/20 bg-transparent text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium w-full text-base">
                  <a href={WA.customCake()}>Enquire Now (WhatsApp)</a>
               </Button>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {(customCakeTestimonials.length ? customCakeTestimonials : data.testimonialCards.slice(0, 2)).map((item) => (
                <article key={`custom-${item.id}`} className="rounded-2xl border border-white/15 bg-brand-warmWhite/30 p-5 backdrop-blur-sm">
                  <p className="text-sm text-brand-caramel">{'★'.repeat(Math.max(1, Math.min(5, item.rating)))}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">&quot;{item.quote}&quot;</p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-white/60">{item.customerName}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-brand-border bg-brand-warmWhite">
        <div className="content-shell space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-textMuted">
              Curation
            </h2>
            <h3 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight">
              A Selection of Excellence
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.cakeShowcase.map((cake) => (
              <Link 
                href="/cakes" 
                key={cake.id} 
                className="group flex flex-col gap-5 rounded-2xl p-4 transition-all hover:bg-brand-cream"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-brand-cream">
                  <Image
                    src={cake.imageUrl}
                    alt={cake.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="space-y-2 px-2 text-center">
                  <h4 className="font-sans text-lg tracking-wide text-brand-deepBrown">
                    {cake.title}
                  </h4>
                  <p className="text-sm font-light text-brand-textMuted">
                    {formatPriceDisplay(cake.priceFrom ?? null, true, cake.askForPricing ?? false)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center pt-8">
             <a href={WA.customCake()} className="group inline-flex items-center gap-2 font-sans font-medium text-brand-deepBrown border-b border-brand-deepBrown pb-1 hover:text-brand-caramel hover:border-brand-caramel transition-colors">
               Start A Custom Order <span className="group-hover:translate-x-1 transition-transform">→</span>
             </a>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-cream">
        <div className="content-shell space-y-16">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left border-b border-brand-border pb-8">
            <div className="space-y-4">
              <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                Testimonials
              </h2>
              <h3 className="section-title mb-0">What Our Guests Say</h3>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-brand-warmWhite px-5 py-2.5 shadow-sm border border-brand-border/40">
              <span className="text-brand-caramel text-xl">★</span>
              <span className="font-medium text-brand-deepBrown tracking-wide">
                {siteConfig.ratingLabel}
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.testimonialCards.slice(0, 3).map((item) => (
              <article 
                key={item.id} 
                className="flex flex-col justify-between rounded-[24px] bg-brand-warmWhite p-8 border border-brand-border/50 shadow-sm"
              >
                <div>
                  <div className="flex gap-1 mb-6 text-brand-caramel text-sm">
                    {'★'.repeat(Math.max(1, Math.min(5, item.rating)))}
                  </div>
                  <p className="font-sans text-lg font-light leading-relaxed text-brand-deepBrown">
                    &quot;{item.quote}&quot;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-brand-border/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center font-display text-xl text-brand-caramel">
                    {item.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-brand-deepBrown">{item.customerName}</p>
                    <p className="text-xs text-brand-textMuted uppercase tracking-wider mt-0.5">{item.occasion}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <TestimonialsCarousel items={data.testimonialCards} />
        </div>
      </section>

      <section className="py-24 bg-brand-deepBrown text-white">
        <div className="content-shell">
          <div className="max-w-4xl mx-auto text-center space-y-10 bg-brand-warmWhite/30 border border-brand-deepBrown/10 rounded-[32px] p-10 md:p-16 backdrop-blur-md">
            <div className="space-y-4">
              <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
                Experience Flour Dude
              </h2>
              <h3 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-tight">
                Secure your booking today.
              </h3>
              <p className="text-brand-deepBrown/80 font-light text-lg max-w-2xl mx-auto pt-4">
                Whether you need an immediate pick-me-up from our daily menu or want to plan the centerpiece cake for an upcoming wedding, our team is ready.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild className="rounded-pill px-8 h-14 bg-brand-deepBrown text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium tracking-wide w-full sm:w-auto">
                <a href={WA.customCake()}>Chat with us on WhatsApp</a>
              </Button>
              <Button asChild className="rounded-pill px-8 h-14 border border-white/20 bg-transparent text-white hover:bg-brand-warmWhite hover:text-brand-deepBrown transition-all font-medium tracking-wide w-full sm:w-auto">
                <Link href="/contact">View Location & Hours</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
