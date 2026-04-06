import type { CollectionConfig } from 'payload';

export const MenuCategory: CollectionConfig = {
  slug: 'menu-categories',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' }
  ]
};
