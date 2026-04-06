import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Flour Dude' },
    { name: 'tagline', type: 'text' },
    { name: 'location', type: 'text', defaultValue: 'Galle, Sri Lanka' },
    { name: 'whatsappNumber', type: 'text' },
    { name: 'uberEatsUrl', type: 'text' },
    { name: 'pickMeUrl', type: 'text' }
  ]
};
