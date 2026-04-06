import type { CollectionConfig } from 'payload';

export const Inquiry: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'source',
      type: 'select',
      options: ['contact-page', 'order-page', 'whatsapp'],
      defaultValue: 'contact-page'
    }
  ]
};
