import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { buildConfig, type CollectionConfig, type FieldHook, type GlobalConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const slugHook = (sourceField: string): FieldHook => ({ data }) => {
  if (!data) {
    return undefined;
  }

  const currentSlug = typeof data.slug === 'string' ? data.slug.trim() : '';
  if (currentSlug.length > 0) {
    return currentSlug;
  }

  const source = typeof data[sourceField] === 'string' ? data[sourceField] : '';
  if (!source) {
    return undefined;
  }

  return slugify(source, { lower: true, strict: true });
};

const users: CollectionConfig = {
  slug: 'users',
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
    },
  },
  admin: {
    useAsTitle: 'username',
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used to log in alongside email',
      },
    },
  ],
};

const media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover'
      }
    ],
    mimeTypes: ['image/*']
  },
  fields: [
    {
      name: 'alt',
      type: 'text'
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        readOnly: true
      }
    }
  ]
};

const menuCategory: CollectionConfig = {
  slug: 'menu-categories',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'sort_order', 'icon_emoji']
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [slugHook('name')]
      }
    },
    { name: 'sort_order', type: 'number' },
    { name: 'icon_emoji', type: 'text', defaultValue: '🍽️' }
  ]
};

const menuItem: CollectionConfig = {
  slug: 'menu-items',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price_lkr', 'available', 'sort_order']
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea', maxLength: 80 },
    { name: 'price_lkr', type: 'number', required: true, min: 0 },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'menu-categories',
      required: true,
      admin: {
        allowCreate: false
      }
    },
    { name: 'available', type: 'checkbox', defaultValue: true },
    {
      name: 'badge',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: '#1 Most Liked', value: 'most-liked-1' },
        { label: '#2 Most Liked', value: 'most-liked-2' },
        { label: '#3 Most Liked', value: 'most-liked-3' },
        { label: "Chef's Pick", value: 'chefs-pick' }
      ]
    },
    {
      name: 'allergens',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Vegan', value: 'vegan' },
        { label: 'Spicy', value: 'spicy' },
        { label: 'Contains Nuts', value: 'contains-nuts' },
        { label: 'Gluten Free', value: 'gluten-free' },
        { label: 'Dairy Free', value: 'dairy-free' }
      ]
    },
    { name: 'sort_order', type: 'number', defaultValue: 0 }
  ]
};

const cakePortfolioItem: CollectionConfig = {
  slug: 'cake-portfolio-items',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured', 'starting_price', 'updatedAt']
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'photos',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        }
      ]
    },
    {
      name: 'occasion_tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Birthdays', value: 'birthdays' },
        { label: 'Weddings', value: 'weddings' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Kids', value: 'kids' },
        { label: 'Novelty', value: 'novelty' }
      ]
    },
    { name: 'description', type: 'textarea' },
    { name: 'starting_price', type: 'number', min: 0 },
    { name: 'show_price', type: 'checkbox', defaultValue: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'whatsapp_message_override',
      type: 'textarea',
      admin: {
        description: 'Leave empty to use default message with cake name'
      }
    }
  ]
};

const heroBanner: CollectionConfig = {
  slug: 'hero-banners',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'active', 'updatedAt']
  },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'headline', type: 'text', required: true, maxLength: 60 },
    { name: 'sub_headline', type: 'text', maxLength: 120 },
    { name: 'cta_1_text', type: 'text', defaultValue: 'Order a Custom Cake' },
    { name: 'cta_2_text', type: 'text', defaultValue: 'See Our Cakes' },
    { name: 'active', type: 'checkbox', defaultValue: false }
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc, operation }) => {
        if (!data?.active) {
          return data;
        }

        const existing = await req.payload.find({
          collection: 'hero-banners',
          where: {
            active: {
              equals: true
            }
          },
          limit: 5
        });

        const hasOtherActive = existing.docs.some((doc) => {
          if (!originalDoc?.id || operation === 'create') {
            return true;
          }
          return String(doc.id) !== String(originalDoc.id);
        });

        if (hasOtherActive) {
          req.payload.logger.warn('Another HeroBanner is already active. You are enabling a new active banner.');
        }

        return data;
      }
    ]
  }
};

const testimonial: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'customer_name',
    defaultColumns: ['customer_name', 'star_rating', 'active', 'sort_order']
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'customer_name', type: 'text', required: true },
    { name: 'occasion', type: 'text' },
    {
      name: 'star_rating',
      type: 'select',
      defaultValue: '5',
      options: [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' }
      ]
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'sort_order', type: 'number' }
  ]
};

const faq: CollectionConfig = {
  slug: 'faqs',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'sort_order']
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Order', value: 'order' },
        { label: 'General', value: 'general' },
        { label: 'Catering', value: 'catering' },
        { label: 'Delivery', value: 'delivery' }
      ]
    },
    { name: 'sort_order', type: 'number' }
  ]
};

const promotion: CollectionConfig = {
  slug: 'promotions',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'banner_type', 'active', 'expires_at']
  },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'sub_headline', type: 'text', maxLength: 140 },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'cta_text', type: 'text' },
    { name: 'cta_url', type: 'text' },
    { name: 'active', type: 'checkbox', defaultValue: false },
    { name: 'expires_at', type: 'date' },
    {
      name: 'banner_type',
      type: 'select',
      required: true,
      options: [
        { label: 'Seasonal Offer', value: 'seasonal' },
        { label: 'Homepage', value: 'homepage' },
        { label: 'Menu', value: 'menu' },
        { label: 'Global', value: 'global' }
      ]
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc, operation }) => {
        if (!data?.active || !data?.banner_type) {
          return data;
        }

        const existing = await req.payload.find({
          collection: 'promotions',
          where: {
            and: [
              { active: { equals: true } },
              { banner_type: { equals: data.banner_type } }
            ]
          },
          limit: 10
        });

        const hasOtherActive = existing.docs.some((doc) => {
          if (!originalDoc?.id || operation === 'create') {
            return true;
          }
          return String(doc.id) !== String(originalDoc.id);
        });

        if (hasOtherActive) {
          req.payload.logger.warn(
            `Another active Promotion already exists for banner_type '${data.banner_type}'.`
          );
        }

        return data;
      }
    ]
  }
};

const inquiry: CollectionConfig = {
  slug: 'inquiries',
  access: {
    create: () => false,
    delete: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user)
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'event_type', 'event_date', 'status', 'createdAt']
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'organisation', type: 'text' },
    { name: 'event_type', type: 'text' },
    { name: 'event_date', type: 'date' },
    { name: 'guest_count', type: 'number' },
    { name: 'budget_range', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Closed', value: 'closed' }
      ],
      admin: {
        position: 'sidebar'
      }
    }
  ],
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'update' && req.user) {
          return {
            status: data?.status
          };
        }
        return data;
      }
    ]
  }
};

const siteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true
  },
  fields: [
    { name: 'whatsapp_number', type: 'text', required: true },
    { name: 'owner_email', type: 'email', required: true },
    { name: 'uber_rating', type: 'text', defaultValue: '5.0' },
    { name: 'uber_review_count', type: 'number', defaultValue: 140 },
    { name: 'cakes_made_count', type: 'number' },
    { name: 'opening_hours', type: 'text', defaultValue: 'Open Daily 8:30 AM – 9:00 PM' },
    { name: 'address_line_1', type: 'text' },
    { name: 'address_line_2', type: 'text' },
    { name: 'city', type: 'text', defaultValue: 'Galle' },
    { name: 'uber_eats_url', type: 'text' },
    { name: 'pickme_url', type: 'text' },
    { name: 'instagram_handle', type: 'text', defaultValue: 'flour_dude' }
  ]
};

const cloudinaryAdapter = ({ prefix }: { prefix?: string }) => ({
  name: 'cloudinary',
  generateURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
    const folder = prefix ? `${prefix}/` : '';
    return cloudinary.url(`${folder}${filename}`, { secure: true, resource_type: 'image' });
  },
  handleUpload: async ({ file }: { file: { buffer: Buffer; filename: string; mimeType: string } }) => {
    const folder = prefix || 'flour-dude';

    const result = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: path.parse(file.filename).name,
          resource_type: 'image'
        },
        (error, uploaded) => {
          if (error || !uploaded) {
            reject(error ?? new Error('Cloudinary upload failed'));
            return;
          }

          resolve({
            public_id: uploaded.public_id,
            secure_url: uploaded.secure_url
          });
        }
      );

      stream.end(file.buffer);
    });

    return {
      cloudinaryPublicId: result.public_id,
      url: result.secure_url
    };
  },
  handleDelete: async ({ doc }: { doc: Record<string, unknown> }) => {
    const publicId = typeof doc.cloudinaryPublicId === 'string' ? doc.cloudinaryPublicId : undefined;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    }
  },
  staticHandler: async (_req: unknown, { doc }: { doc?: { url?: string } }) => {
    if (!doc?.url) {
      return new Response('Not Found', { status: 404 });
    }

    return Response.redirect(doc.url, 302);
  }
});

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      autoGenerate: true,
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, 'src/app/(payload)/admin/importMap.js')
    },
    meta: {
      titleSuffix: '— Flour Dude CMS'
    }
  },
  routes: {
    admin: '/admin'
  },
  collections: [
    users,
    media,
    menuCategory,
    menuItem,
    cakePortfolioItem,
    heroBanner,
    testimonial,
    faq,
    promotion,
    inquiry
  ],
  globals: [siteSettings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || ''
    }
  }),
  editor: lexicalEditor(),
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter as never,
          disableLocalStorage: true,
          prefix: 'flour-dude'
        }
      }
    })
  ],
  secret: process.env.PAYLOAD_SECRET || 'replace-me',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts')
  }
});
