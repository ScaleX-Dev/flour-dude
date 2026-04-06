import type { CollectionConfig } from 'payload';

export const Promotion: CollectionConfig = {
  slug: 'promotions',
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'startsAt', type: 'date' },
    { name: 'endsAt', type: 'date' },
    { name: 'active', type: 'checkbox', defaultValue: true }
  ]
};
