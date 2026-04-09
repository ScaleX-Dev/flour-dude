import { AtSign, Clock3, MapPin } from 'lucide-react';
import { GeneralInquiryForm } from '@/components/contact/GeneralInquiryForm';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { SectionHeading, MutedText } from '@/components/ui/Typography';
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
    <>
      <SchemaMarkup id="schema-breadcrumb-contact" schema={breadcrumbSchema} />
      <section className="section-space bg-warmWhite">
        <div className="content-shell grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="space-y-5 rounded-card border border-borderColor bg-cream p-6">
            <SectionHeading>Come Visit Us</SectionHeading>

            <div className="space-y-3 text-sm text-textBody">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-caramel" />
                <span>Bandara Mawatha & Thalapitiya Road, Galle</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 text-caramel" />
                <span>Open Daily 8:30 AM - 9:00 PM</span>
              </p>
              <p className="flex items-start gap-2">
                <AtSign className="mt-0.5 h-4 w-4 text-caramel" />
                <a href="https://instagram.com/flour_dude" target="_blank" rel="noreferrer" className="hover:text-caramel">
                  @flour_dude
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={settings.uberEatsUrl} target="_blank" rel="noreferrer">
                <Button variant="primary">Order on Uber Eats</Button>
              </a>
              <a href={settings.pickMeUrl} target="_blank" rel="noreferrer">
                <Button variant="outline">Order on PickMe</Button>
              </a>
            </div>

            <a href={buildWhatsAppLink(whatsappMessages.default)} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="lg">
                Chat with us on WhatsApp
              </Button>
            </a>
          </article>

          <article className="overflow-hidden rounded-card border border-borderColor bg-cream">
            <iframe
              title="Flour Dude map"
              src="https://maps.google.com/maps?q=Galle%2C%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-[400px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </article>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell space-y-4">
          <SectionHeading>General Inquiry</SectionHeading>
          <MutedText>Send us your details and we will get back to you shortly.</MutedText>
          <GeneralInquiryForm />
        </div>
      </section>
    </>
  );
}
