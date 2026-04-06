import type { CollectionConfig } from 'payload';

export const FAQ: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question'
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true }
  ]
};
