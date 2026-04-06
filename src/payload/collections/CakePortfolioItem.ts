import type { CollectionConfig } from 'payload';

export const CakePortfolioItem: CollectionConfig = {
  slug: 'cake-portfolio-items',
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'priceFrom', type: 'number' }
  ]
};
