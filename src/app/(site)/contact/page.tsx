import { AtSign, Clock3, MapPin } from 'lucide-react';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { generateMetadata } from '@/lib/metadata';
import { getSiteSettingsData } from '@/lib/payload';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

export const metadata = generateMetadata({
  title: 'Contact Flour Dude — Galle Bakery & Cafe',
  description:
    'Visit Flour Dude at Bandara Mawatha, Galle. Open daily 8:30 AM – 9 PM. Order on Uber Eats, PickMe, or WhatsApp.',
  path: '/contact'
});

export default async function ContactPage() {
  const settings = await getSiteSettingsData();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' }
  ]);

  return (
    <div className="bg-brand-cream min-h-screen pt-[calc(var(--header-height)+3rem)] pb-24">
      <SchemaMarkup id="schema-breadcrumb-contact" schema={breadcrumbSchema} />
      
      <section className="content-shell mb-16 text-center max-w-3xl mx-auto space-y-6 animate-rise-in">
        <h1 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
          Get in Touch
        </h1>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-deepBrown tracking-tighter leading-[1.1] md:leading-[1.05]">
          Contact Flour Dude
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-light text-brand-textMuted leading-relaxed">
          Whether you have a general inquiry or want to visit our studio in Galle, we&apos;d love to hear from you.
        </p>
      </section>

      <section className="content-shell grid gap-12 lg:grid-cols-2 items-start">
        <div className="space-y-8 animate-rise-in" style={{ animationDelay: '100ms' }}>
          <article className="space-y-8 rounded-[32px] border border-brand-border/40 bg-brand-warmWhite p-8 md:p-12 shadow-sm hover:shadow-floating transition-all duration-500">
            <div className="space-y-2">
              <h3 className="font-display text-3xl text-brand-deepBrown">Visit Us</h3>
              <p className="font-light text-brand-textMuted">Stop by for a fresh bake or a consultation.</p>
            </div>

            <div className="space-y-6 text-lg font-light text-brand-textBody">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-[16px] bg-brand-cream border border-brand-border/50 flex items-center justify-center text-brand-caramel">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="pt-2">
                  <p className="font-medium text-brand-deepBrown">Galle Studio</p>
                  <p className="text-brand-textMuted">Bandara Mawatha & Thalapitiya Road, Galle</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-[16px] bg-brand-cream border border-brand-border/50 flex items-center justify-center text-brand-caramel">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div className="pt-2">
                  <p className="font-medium text-brand-deepBrown">Opening Hours</p>
                  <p className="text-brand-textMuted">Open Daily 8:30 AM - 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-[16px] bg-brand-cream border border-brand-border/50 flex items-center justify-center text-brand-caramel">
                  <AtSign className="h-5 w-5" />
                </div>
                <div className="pt-2">
                  <p className="font-medium text-brand-deepBrown">Social Media</p>
                  <p className="text-brand-textMuted">
                    <a href="https://instagram.com/flour_dude" target="_blank" rel="noreferrer" className="hover:text-brand-caramel transition-colors">
                      @flour_dude
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-border/40 space-y-4">
              <p className="font-sans text-xs font-semibold tracking-wider uppercase text-brand-textMuted">Quick Order</p>
              <div className="flex flex-wrap gap-3">
                <a href={settings.uberEatsUrl} target="_blank" rel="noreferrer" className="flex-1">
                  <Button className="w-full rounded-pill h-12 bg-brand-deepBrown text-white hover:bg-brand-caramel transition-colors">
                    Uber Eats
                  </Button>
                </a>
                <a href={settings.pickMeUrl} target="_blank" rel="noreferrer" className="flex-1">
                  <Button className="w-full rounded-pill h-12 border border-brand-border bg-brand-warmWhite text-brand-deepBrown hover:bg-brand-cream transition-colors">
                    PickMe
                  </Button>
                </a>
              </div>
              <a href={buildWhatsAppLink(whatsappMessages.default)} target="_blank" rel="noreferrer" className="block w-full">
                <Button className="w-full rounded-pill h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors font-medium text-lg">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </article>
        </div>

        <div className="space-y-8 animate-rise-in" style={{ animationDelay: '200ms' }}>
          <article className="overflow-hidden rounded-[32px] border border-brand-border/40 bg-brand-warmWhite shadow-sm p-2">
            <div className="overflow-hidden rounded-[24px]">
              <iframe
                title="Flour Dude map"
                src="https://maps.google.com/maps?q=Galle%2C%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-[300px] w-full border-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
