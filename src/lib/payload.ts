import { getPayload } from 'payload';
import config from '../../payload.config';
import { heroImages, menuCategories as seedCategories, menuItems as seedItems } from '@/lib/site';

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
