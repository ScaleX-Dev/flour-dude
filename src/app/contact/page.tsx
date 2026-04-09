import type { Metadata } from 'next';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Flour Dude',
  description: 'Find Flour Dude in Galle, check opening hours, and contact us via WhatsApp for custom cakes and catering.'
};

export default function ContactPage() {
  return (
    <>
      <section className="section-space bg-brand-cream">
        <div className="content-shell space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">Contact</p>
          <h1 className="section-title text-5xl text-brand-deepBrown sm:text-6xl">Visit Flour Dude In Galle</h1>
          <p className="max-w-2xl text-brand-textMuted">
            For fastest support, message us directly on WhatsApp. We are open every day and available for both cafe and custom cake requests.
          </p>
          <WhatsAppButton label="Chat On WhatsApp" messageType="default" />
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <article className="rounded-card border border-brand-border bg-brand-cream p-6">
            <h2 className="text-2xl font-semibold text-brand-deepBrown">Store Details</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-textBody">
              {siteConfig.locations.map((location) => (
                <li key={location}>{location}</li>
              ))}
              <li>{siteConfig.hours}</li>
              <li>{siteConfig.ratingLabel}</li>
              <li>Instagram: {siteConfig.instagramHandle}</li>
            </ul>

            <div className="mt-6 space-y-3">
              <WhatsAppButton label="Cake Order WhatsApp" messageType="customCake" className="w-full" />
              <WhatsAppButton label="B2B Catering WhatsApp" messageType="b2b" className="w-full bg-brand-rose hover:bg-[#e5a592]" />
            </div>
          </article>

          <article className="overflow-hidden rounded-card border border-brand-border bg-brand-cream">
            <iframe
              title="Flour Dude Galle map"
              src="https://maps.google.com/maps?q=Galle%2C%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-[380px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </article>
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell rounded-card border border-white/15 p-6 sm:p-8">
          <h2 className="section-title text-4xl text-brand-warmWhite">Quick Inquiry Form</h2>
          <p className="mt-2 text-brand-warmWhite/80">Leave your details and we will follow up. Urgent orders should always go to WhatsApp first.</p>

          <form className="mt-6 grid gap-3 sm:grid-cols-2" action="#" method="post">
            <label className="space-y-1 text-sm">
              <span>Name</span>
              <input
                required
                type="text"
                name="name"
                className="w-full rounded-button border border-white/20 bg-white/10 px-3 py-2 text-brand-warmWhite placeholder:text-brand-warmWhite/50"
                placeholder="Your name"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>Phone</span>
              <input
                required
                type="tel"
                name="phone"
                className="w-full rounded-button border border-white/20 bg-white/10 px-3 py-2 text-brand-warmWhite placeholder:text-brand-warmWhite/50"
                placeholder="07X XXX XXXX"
              />
            </label>
            <label className="space-y-1 text-sm sm:col-span-2">
              <span>Message</span>
              <textarea
                required
                name="message"
                rows={4}
                className="w-full rounded-button border border-white/20 bg-white/10 px-3 py-2 text-brand-warmWhite placeholder:text-brand-warmWhite/50"
                placeholder="Tell us what you need"
              />
            </label>
            <p className="text-xs text-brand-warmWhite/70 sm:col-span-2">
              This form can be wired to Payload Inquiry collection and Resend notifications in the next integration step.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
