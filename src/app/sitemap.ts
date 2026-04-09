import type { MetadataRoute } from 'next';
import { getAllCakes } from '@/lib/payload';

type StaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const BASE_URL = 'https://flourdude.lk';

const staticRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/menu', changeFrequency: 'daily', priority: 0.9 },
  { path: '/cakes', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/order', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 }
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  try {
    const cakes = await getAllCakes();

    const dynamicEntries: MetadataRoute.Sitemap = [];

    cakes.forEach((cake) => {
        const directSlug =
          (cake as unknown as { slug?: string | null }).slug ??
          (cake as unknown as { handle?: string | null }).handle;
        const fallbackTitle = cake.name ?? cake.title;
        const slug =
          (typeof directSlug === 'string' && directSlug.trim().length > 0
            ? directSlug
            : fallbackTitle
              ? slugify(fallbackTitle)
              : '') || '';

        if (!slug) {
          return;
        }

        dynamicEntries.push({
          url: `${BASE_URL}/cakes/${slug}`,
          lastModified: cake.updatedAt ? new Date(cake.updatedAt) : now,
          changeFrequency: 'weekly' as const,
          priority: 0.7
        });
      });

    return [...staticEntries, ...dynamicEntries];
  } catch {
    return staticEntries;
  }
}
