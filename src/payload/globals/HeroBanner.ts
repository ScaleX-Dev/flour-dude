import type { GlobalConfig } from 'payload';

export const HeroBanner: GlobalConfig = {
  slug: 'hero-banner',
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'textarea' },
    { name: 'primaryCtaText', type: 'text' },
    { name: 'primaryCtaHref', type: 'text' }
  ]
};
