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
      <section className="relative min-h-[92vh] overflow-hidden bg-brown-deep text-warmWhite">
        <Image
          src={heroImages.cake}
          alt="Signature Flour Dude celebration cake"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-deep/92 via-brown-deep/72 to-brown-deep/40" />

        <div className="content-shell relative z-10 flex min-h-[92vh] items-end pb-20 pt-24">
          <div className="max-w-3xl space-y-6 animate-rise-in">
            <Eyebrow className="text-caramel-light">{data.locationLabel}</Eyebrow>
            <DisplayHeading className="text-warmWhite">{data.heroHeadline}</DisplayHeading>
            <BodyText className="max-w-2xl text-warmWhite/85">{data.heroSubheadline}</BodyText>

            <div className="flex flex-wrap items-center gap-3">
              <a href={data.heroPrimaryCtaHref} target="_blank" rel="noreferrer">
                <Button variant="whatsapp" size="lg">
                  {data.heroPrimaryCtaText}
                </Button>
              </a>
              <Link href="/menu">
                <Button variant="outline" size="lg" className="border-warmWhite text-warmWhite hover:bg-warmWhite/10 hover:text-warmWhite">
                  View Full Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {data.promo ? (
        <section className="section-space bg-rose/20">
          <div className="content-shell rounded-card border border-borderColor bg-warmWhite p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-3xl space-y-2">
                <Eyebrow className="text-rose">Limited Time</Eyebrow>
                <SectionHeading>{data.promo.title}</SectionHeading>
                <MutedText>{data.promo.body}</MutedText>
                {data.promo.endsAt ? <PromoCountdown expiresAt={data.promo.endsAt} /> : null}
              </div>
              <WhatsAppButton label="Claim Offer on WhatsApp" messageType="customCake" />
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-space bg-warmWhite">
        <div className="content-shell space-y-8">
          <div className="space-y-2">
            <Eyebrow>Featured Menu</Eyebrow>
            <SectionHeading>Fresh Favorites From Our Kitchen</SectionHeading>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {data.featuredMenu.map((item) => (
              <article key={item.id} className="rounded-card border border-borderColor bg-cream p-5">
                {item.badge ? (
                  <p className="inline-flex rounded-pill bg-sage/20 px-3 py-1 text-xs font-semibold text-sage">{item.badge}</p>
                ) : null}
                <h3 className="mt-3 font-display text-2xl text-brown-deep">{item.name}</h3>
                <MutedText className="mt-2">{item.description}</MutedText>
                <p className="mt-4 text-sm font-semibold text-brown-mid">
                  {formatLKR(item.price ?? 0)}
                </p>
              </article>
            ))}
          </div>

          <div>
            <Link href="/menu">
              <Button variant="primary">See Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell space-y-8">
          <div className="space-y-2">
            <Eyebrow className="text-sage">Custom Cake Gallery</Eyebrow>
            <SectionHeading>Choose A Style. We Customize The Rest.</SectionHeading>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.cakeShowcase.map((cake) => (
              <article key={cake.id} className={`overflow-hidden rounded-card border border-borderColor ${cake.cardTone}`}>
                <div className="relative aspect-square">
                  <Image
                    src={cake.imageUrl}
                    alt={cake.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="font-semibold text-brown-deep">{cake.title}</h3>
                  <MutedText>{cake.description}</MutedText>
                  <p className="text-sm font-semibold text-brown-mid">
                    {formatPriceDisplay(cake.priceFrom ?? null, true, cake.askForPricing ?? false)}
                  </p>
                  <a
                    href={WA.cakeOrder(cake.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex pt-1 text-sm font-semibold text-caramel hover:text-caramel-light"
                  >
                    Order this design
                  </a>
                </div>
              </article>
            ))}
          </div>

          <WhatsAppButton label="Design My Custom Cake" messageType="customCake" />
        </div>
      </section>

      <section className="section-space bg-brown-deep text-warmWhite">
        <div className="content-shell grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <Eyebrow className="text-caramel-light">How It Works</Eyebrow>
            <SectionHeading className="text-warmWhite">Send Your Idea. Receive Your Quote Fast.</SectionHeading>
            <BodyText className="text-warmWhite/80">
              Share inspiration photos, flavor choices, and your delivery date. Our team responds quickly and helps you finalize a cake that looks special and tastes incredible.
            </BodyText>
          </div>

          <div className="rounded-card border border-white/15 bg-warmWhite/10 p-6 backdrop-blur-sm">
            <ol className="space-y-4 text-sm text-warmWhite/90">
              <li className="rounded-card border border-white/10 bg-white/5 p-4">1. Message us on WhatsApp with your event details.</li>
              <li className="rounded-card border border-white/10 bg-white/5 p-4">2. Confirm design, flavor, and timeline.</li>
              <li className="rounded-card border border-white/10 bg-white/5 p-4">3. Receive your cake by pickup or delivery.</li>
            </ol>
            <div className="mt-5">
              <WhatsAppButton label="Start a WhatsApp Order" messageType="customCake" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-warmWhite">
        <div className="content-shell space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <Eyebrow className="text-sage">Social Proof</Eyebrow>
              <SectionHeading>Loved Across Galle</SectionHeading>
            </div>
            <p className="rounded-pill bg-sage/15 px-4 py-2 text-sm font-semibold text-sage">{siteConfig.ratingLabel}</p>
          </div>

          <div className="hidden gap-5 lg:grid lg:grid-cols-3">
            {data.testimonialCards.slice(0, 3).map((item) => (
              <article key={item.id} className={`relative rounded-card border border-borderColor p-6 ${item.cardTone}`}>
                <p className="pointer-events-none absolute left-4 top-0 font-display text-[72px] leading-none text-caramel/20">“</p>
                <BodyText className="relative z-10 mt-5 italic">{item.quote}</BodyText>
                <div className="mt-4 space-y-1">
                  <p className="text-[13px] font-semibold text-brown-deep">{item.customerName}</p>
                  <p className="text-[12px] text-textMuted">{item.occasion}</p>
                  <p className="text-sm text-caramel">{'⭐'.repeat(Math.max(1, Math.min(5, item.rating)))}</p>
                </div>
              </article>
            ))}
          </div>

          <TestimonialsCarousel items={data.testimonialCards} />
        </div>
      </section>

      <section className="section-space bg-rose/15">
        <div className="content-shell grid gap-8 rounded-card border border-borderColor bg-warmWhite p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-3">
            <Eyebrow className="text-rose">B2B and Events</Eyebrow>
            <SectionHeading>Dessert Programs For Hotels, Offices, and Celebrations</SectionHeading>
            <MutedText>
              We build reliable catering plans for recurring office needs, launches, weddings, and hospitality partners in Galle and nearby areas.
            </MutedText>
            <p className="text-sm font-semibold text-brown-mid">Packages from {formatLKR(15000)}</p>
            <WhatsAppButton label="Discuss B2B Catering" messageType="b2b" />
          </div>

          <div className="relative overflow-hidden rounded-card">
            <Image
              src={heroImages.celebration}
              alt="Flour Dude event dessert setup"
              width={960}
              height={760}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell space-y-6">
          <div className="space-y-2">
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <SectionHeading>Everything You Need Before Ordering</SectionHeading>
          </div>

          <div className="grid gap-4">
            {data.faqCards.map((item) => (
              <details key={item.id} className="group rounded-card border border-borderColor bg-warmWhite p-5" open={false}>
                <summary className="cursor-pointer list-none pr-6 text-base font-semibold text-brown-deep">
                  {item.question}
                </summary>
                <MutedText className="mt-3">{item.answer}</MutedText>
              </details>
            ))}
          </div>

          <div className="pt-2">
            <Link href="/order">
              <Button variant="ghost">See Ordering Details</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-brown-deep text-warmWhite">
        <div className="content-shell space-y-5 text-center">
          <Eyebrow className="text-caramel-light">Ready To Order</Eyebrow>
          <SectionHeading className="text-warmWhite">Your Next Cake Starts With One WhatsApp Message.</SectionHeading>
          <BodyText className="mx-auto max-w-2xl text-warmWhite/85">
            Share your idea with Flour Dude now. We reply fast and guide every step from design to delivery.
          </BodyText>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton label="Order a Custom Cake" messageType="customCake" />
            <Link href="/contact">
              <Button variant="outline" className="border-warmWhite text-warmWhite hover:bg-warmWhite/10 hover:text-warmWhite">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
