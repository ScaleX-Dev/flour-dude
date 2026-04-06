import path from 'path';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { fileURLToPath } from 'url';
import { CakePortfolioItem } from './src/payload/collections/CakePortfolioItem';
import { FAQ } from './src/payload/collections/FAQ';
import { Inquiry } from './src/payload/collections/Inquiry';
import { Media } from './src/payload/collections/Media';
import { MenuCategory } from './src/payload/collections/MenuCategory';
import { MenuItem } from './src/payload/collections/MenuItem';
import { Promotion } from './src/payload/collections/Promotion';
import { Testimonial } from './src/payload/collections/Testimonial';
import { HeroBanner } from './src/payload/globals/HeroBanner';
import { SiteSettings } from './src/payload/globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users'
  },
  collections: [
    Media,
    MenuCategory,
    MenuItem,
    CakePortfolioItem,
    Testimonial,
    FAQ,
    Promotion,
    Inquiry
  ],
  globals: [HeroBanner, SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || ''
    }
  }),
  plugins: [],
  secret: process.env.PAYLOAD_SECRET || 'replace-me',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts')
  }
});
