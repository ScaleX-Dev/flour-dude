import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFab';
import { LOCAL_BUSINESS_SCHEMA, SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: 'Flour Dude — Custom Cakes, Cafe & Catering · Galle, Sri Lanka',
  description: siteConfig.description,
  keywords: ['custom cakes Galle', 'bakery Galle', 'waffles Galle', 'cake delivery Galle', 'Flour Dude'],
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.baseUrl
  }
};

export default function SiteRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup id="schema-local-business" schema={LOCAL_BUSINESS_SCHEMA} />
      <SiteHeader />
      <main className="min-h-screen pt-[var(--header-height)]">{children}</main>
      <SiteFooter />
      <WhatsAppFAB />
    </>
  );
}
