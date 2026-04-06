import type { CollectionConfig } from 'payload';

export const Testimonial: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'customerName'
  },
  fields: [
    { name: 'customerName', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'rating', type: 'number', min: 1, max: 5 }
  ]
};
