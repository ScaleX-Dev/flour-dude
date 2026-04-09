import type { Metadata } from 'next';

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generateMetadata(page: PageSEO): Metadata {
  const url = `https://flourdude.lk${page.path}`;

  return {
    title: `${page.title} | Flour Dude · Galle, Sri Lanka`,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: 'Flour Dude',
      locale: 'en_LK',
      type: 'website',
      images: [
        {
          url: page.image ?? 'https://flourdude.lk/og-default.jpg',
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: { card: 'summary_large_image' }
  };
}
