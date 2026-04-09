import { getPayload } from 'payload';
import config from '../../payload.config';
import type {
  CakePortfolioItem,
  FAQ,
  HeroBanner,
  MenuCategory,
  MenuItem,
  Promotion,
  SiteSettings,
  Testimonial
} from '@/payload-types';
import { heroImages, siteConfig } from '@/lib/site';

const REVALIDATE_SECONDS = 60;

let payloadInstance: ReturnType<typeof getPayload> | null = null;

function getBaseURL() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

async function fetchPayload<T>(path: string): Promise<T> {
  const response = await fetch(`${getBaseURL()}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS }
  });

  if (!response.ok) {
    throw new Error(`Payload fetch failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getHeroBanner(): Promise<HeroBanner | null> {
  try {
    const result = await fetchPayload<{ docs: HeroBanner[] }>(
      '/api/payload/hero-banners?where[active][equals]=true&limit=1&sort=-updatedAt'
    );

    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function getFeaturedCakes(limit = 8): Promise<CakePortfolioItem[]> {
  try {
    const result = await fetchPayload<{ docs: CakePortfolioItem[] }>(
      `/api/payload/cake-portfolio-items?where[featured][equals]=true&depth=2&sort=-updatedAt&limit=${limit}`
    );

    return result.docs;
  } catch {
    return [];
  }
}

export async function getAllCakes(): Promise<CakePortfolioItem[]> {
  try {
    const result = await fetchPayload<{ docs: CakePortfolioItem[] }>(
      '/api/payload/cake-portfolio-items?depth=2&limit=200&sort=-updatedAt'
    );

    return [...result.docs].sort((a, b) => {
      const aFeatured = Boolean(a.featured);
      const bFeatured = Boolean(b.featured);

      if (aFeatured !== bFeatured) {
        return aFeatured ? -1 : 1;
      }

      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });
  } catch {
    return [];
  }
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const result = await fetchPayload<{ docs: MenuCategory[] }>(
      '/api/payload/menu-categories?limit=100&sort=sort_order'
    );

    return result.docs;
  } catch {
    return [];
  }
}

export async function getMenuItems(categorySlug?: string): Promise<MenuItem[]> {
  try {
    const result = await fetchPayload<{ docs: MenuItem[] }>(
      '/api/payload/menu-items?depth=2&limit=300&sort=sort_order'
    );

    if (!categorySlug) {
      return result.docs;
    }

    return result.docs.filter((item) => {
      const category = item.category;
      return typeof category === 'object' && category !== null && category.slug === categorySlug;
    });
  } catch {
    return [];
  }
}

export async function getTestimonials(limit = 3): Promise<Testimonial[]> {
  try {
    const result = await fetchPayload<{ docs: Testimonial[] }>(
      `/api/payload/testimonials?where[active][equals]=true&sort=sort_order&limit=${limit}`
    );

    return result.docs;
  } catch {
    return [];
  }
}

export async function getActivePromotion(
  type: 'homepage' | 'menu' | 'global'
): Promise<Promotion | null> {
  try {
    const now = new Date().toISOString();
    const query =
      '/api/payload/promotions?' +
      new URLSearchParams({
        'where[active][equals]': 'true',
        'where[banner_type][equals]': type,
        'where[expires_at][greater_than]': now,
        sort: '-updatedAt',
        limit: '1'
      }).toString();

    const result = await fetchPayload<{ docs: Promotion[] }>(query);
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await fetchPayload<SiteSettings>('/api/payload/globals/site-settings');
  return result;
}

export type SiteSettingsPageData = {
  siteName: string;
  tagline: string;
  location: string;
  whatsappNumber: string;
  uberEatsUrl: string;
  pickMeUrl: string;
  founderName: string;
  founderStory: string[];
  founderPhotoUrl?: string;
  milestones: Array<{ year: string; label: string }>;
  galleryImageUrls: string[];
};

export async function getSiteSettingsData(): Promise<SiteSettingsPageData> {
  const fallback: SiteSettingsPageData = {
    siteName: siteConfig.name,
    tagline: 'Baked fresh in Galle',
    location: siteConfig.locations.join(' & '),
    whatsappNumber: siteConfig.whatsappNumber,
    uberEatsUrl: 'https://www.ubereats.com',
    pickMeUrl: 'https://pickme.lk/food',
    founderName: 'Founder, Flour Dude',
    founderStory: [
      'Flour Dude began as a small passion project in Galle, focused on cakes that feel personal and unforgettable.',
      'What started with birthday cakes quickly grew into weddings, hotel catering, and daily cafe favorites.',
      'Every order is still treated with care, from design consultations to the final hand-finished details.'
    ],
    founderPhotoUrl: heroImages.celebration,
    milestones: [
      { year: '2020', label: 'First custom cake delivered' },
      { year: '2022', label: 'Expanded to daily cafe menu' },
      { year: '2024', label: 'Launched full B2B catering services' }
    ],
    galleryImageUrls: [
      heroImages.cake,
      heroImages.waffle,
      heroImages.celebration,
      heroImages.cake,
      heroImages.waffle,
      heroImages.celebration
    ]
  };

  try {
    const settings = await getSiteSettings();
    const location = [settings.address_line_1, settings.address_line_2, settings.city]
      .filter((value): value is string => Boolean(value && value.trim().length))
      .join(', ');

    return {
      ...fallback,
      whatsappNumber: settings.whatsapp_number ?? fallback.whatsappNumber,
      uberEatsUrl: settings.uber_eats_url ?? fallback.uberEatsUrl,
      pickMeUrl: settings.pickme_url ?? fallback.pickMeUrl,
      location: location || fallback.location
    };
  } catch {
    return fallback;
  }
}

export async function getFAQs(category?: string): Promise<FAQ[]> {
  try {
    const query = category
      ? `/api/payload/faqs?where[category][equals]=${encodeURIComponent(category)}&sort=sort_order&limit=200`
      : '/api/payload/faqs?sort=sort_order&limit=200';

    const result = await fetchPayload<{ docs: FAQ[] }>(query);
    return result.docs;
  } catch {
    return [];
  }
}

// Kept for internal server API routes writing to Payload collections.
export async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = getPayload({ config });
  }

  return payloadInstance;
}
