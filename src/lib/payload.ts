import { getPayload } from 'payload';
import config from '../../payload.config';
import {
  cakePortfolio as seedCakes,
  heroImages,
  menuCategories as seedCategories,
  menuItems as seedItems
} from '@/lib/site';

let payloadInstance: ReturnType<typeof getPayload> | null = null;

export type MenuCategoryData = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
};

export type MenuItemData = {
  id: string;
  name: string;
  description?: string;
  price: number;
  categorySlug: string;
  sortOrder: number;
  imageUrl?: string;
  available: boolean;
  badge?: string;
  dietaryTags: string[];
};

export type CakeItemData = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  priceFrom?: number;
  featured: boolean;
  createdAt?: string;
  occasion: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function resolveMediaUrl(media?: number | { url?: string | null } | null): string | undefined {
  if (!media || typeof media === 'number') {
    return undefined;
  }

  return media.url ?? undefined;
}

export async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = getPayload({ config });
  }

  return payloadInstance;
}

export async function getMenuCategories(): Promise<MenuCategoryData[]> {
  try {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: 'menu-categories',
      limit: 100,
      sort: 'name'
    });

    const docs = (response.docs as Array<Record<string, unknown>>) ?? [];
    const mapped = docs.map((doc, index) => ({
      id: String(doc.id ?? `category-${index}`),
      name: String(doc.name ?? 'Category'),
      slug: String(doc.slug ?? slugify(String(doc.name ?? `category-${index}`))),
      description: typeof doc.description === 'string' ? doc.description : undefined,
      sortOrder:
        typeof doc.sort_order === 'number'
          ? doc.sort_order
          : typeof doc.sortOrder === 'number'
            ? doc.sortOrder
            : index + 1
    }));

    return mapped.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return seedCategories
      .map((item, index) => ({
        id: `seed-category-${index}`,
        name: item.name,
        slug: item.slug,
        description: item.description ?? undefined,
        sortOrder: index + 1
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export async function getMenuItems(): Promise<MenuItemData[]> {
  try {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: 'menu-items',
      limit: 200,
      depth: 1,
      sort: '-createdAt'
    });

    const docs = (response.docs as Array<Record<string, unknown>>) ?? [];

    const mapped = docs.map((doc, index) => {
      const rawCategory = doc.category as number | Record<string, unknown> | null | undefined;
      const categoryName =
        rawCategory && typeof rawCategory === 'object' && typeof rawCategory.name === 'string'
          ? rawCategory.name
          : 'all';
      const categorySlug =
        rawCategory && typeof rawCategory === 'object' && typeof rawCategory.slug === 'string'
          ? rawCategory.slug
          : slugify(categoryName);

      const rawTags = doc.dietary_tags ?? doc.dietaryTags;
      const dietaryTags = Array.isArray(rawTags)
        ? rawTags.filter((tag): tag is string => typeof tag === 'string')
        : [];

      const available =
        typeof doc.available === 'boolean'
          ? doc.available
          : typeof doc.isAvailable === 'boolean'
            ? doc.isAvailable
            : true;

      return {
        id: String(doc.id ?? `item-${index}`),
        name: String(doc.name ?? 'Menu item'),
        description: typeof doc.description === 'string' ? doc.description : undefined,
        price: typeof doc.price === 'number' ? doc.price : 0,
        categorySlug,
        sortOrder:
          typeof doc.sort_order === 'number'
            ? doc.sort_order
            : typeof doc.sortOrder === 'number'
              ? doc.sortOrder
              : index + 1,
        imageUrl: resolveMediaUrl((doc.image as number | { url?: string | null } | null) ?? null),
        available,
        badge:
          typeof doc.badge === 'string'
            ? doc.badge
            : typeof doc.featureBadge === 'string'
              ? doc.featureBadge
              : undefined,
        dietaryTags
      };
    });

    return mapped.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return seedItems.map((item, index) => {
      const badge = index === 0 ? '#1 Most Liked' : index === 3 ? "Chef's Pick" : undefined;

      return {
        id: `seed-item-${index}`,
        name: item.name,
        description: item.description ?? undefined,
        price: item.price,
        categorySlug: item.categorySlug,
        sortOrder: index + 1,
        imageUrl: index % 2 === 0 ? heroImages.waffle : heroImages.cake,
        available: true,
        badge,
        dietaryTags: index % 4 === 0 ? ['Contains Nuts'] : index % 3 === 0 ? ['Spicy'] : []
      };
    });
  }
}

export async function getAllCakes(): Promise<CakeItemData[]> {
  try {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: 'cake-portfolio-items',
      limit: 250,
      depth: 1,
      sort: '-createdAt'
    });

    const docs = (response.docs as Array<Record<string, unknown>>) ?? [];
    const mapped = docs.map((doc, index) => {
      const rawOccasion = doc.occasion ?? doc.occasion_type ?? doc.occasionType;
      const occasion = typeof rawOccasion === 'string' && rawOccasion.trim().length ? rawOccasion : 'birthdays';

      return {
        id: String(doc.id ?? `cake-${index}`),
        name: String(doc.title ?? 'Custom Cake'),
        description: typeof doc.description === 'string' ? doc.description : undefined,
        imageUrl: resolveMediaUrl((doc.image as number | { url?: string | null } | null) ?? null),
        priceFrom: typeof doc.priceFrom === 'number' ? doc.priceFrom : undefined,
        featured:
          typeof doc.featured === 'boolean'
            ? doc.featured
            : typeof doc.isFeatured === 'boolean'
              ? doc.isFeatured
              : false,
        createdAt: typeof doc.createdAt === 'string' ? doc.createdAt : undefined,
        occasion: slugify(occasion)
      };
    });

    return mapped.sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }

      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  } catch {
    return seedCakes
      .map((item, index) => {
        const occasion =
          index % 5 === 0
            ? 'weddings'
            : index % 4 === 0
              ? 'corporate'
              : index % 3 === 0
                ? 'novelty-theme'
                : index % 2 === 0
                  ? 'kids'
                  : 'birthdays';

        return {
          id: `seed-cake-${index}`,
          name: item.title,
          description: item.description ?? undefined,
          imageUrl: item.imageUrl ?? (index % 2 === 0 ? heroImages.cake : heroImages.waffle),
          priceFrom: item.priceFrom ?? undefined,
          featured: index < 2,
          createdAt: undefined,
          occasion
        };
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }

        return 0;
      });
  }
}
