type JsonLd = Record<string, unknown>;

type SchemaMarkupProps = {
  schema: JsonLd | JsonLd[];
  id?: string;
};

export const LOCAL_BUSINESS_SCHEMA: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'Flour Dude',
  url: 'https://flourdude.lk',
  telephone: '+94XXXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bandara Mawatha & Thalapitiya Road',
    addressLocality: 'Galle',
    addressRegion: 'Southern Province',
    addressCountry: 'LK'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:30',
      closes: '21:00'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '140'
  },
  servesCuisine: 'Bakery, Cafe',
  priceRange: 'LKR 550 – LKR 1,500'
};

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://flourdude.lk${item.path}`
    }))
  };
}

export function SchemaMarkup({ schema, id }: SchemaMarkupProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
