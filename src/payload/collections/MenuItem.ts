import type { CollectionConfig } from 'payload';

export const MenuItem: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'menu-categories',
      required: true
    },
    { name: 'price', type: 'number', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false }
  ]
};
