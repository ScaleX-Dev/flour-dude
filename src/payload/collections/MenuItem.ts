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
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media'
    },
    { name: 'imageUrl', type: 'text' },
    { name: 'badge', type: 'text' },
    { name: 'available', type: 'checkbox', defaultValue: true },
    {
      name: 'sort_order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower values are shown first.'
      }
    },
    {
      name: 'dietaryTags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }]
    },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false }
  ]
};
