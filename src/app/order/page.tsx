import type { Metadata } from 'next';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { faqs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How To Order',
  description: 'Order from Flour Dude in 3 simple WhatsApp-first steps. Includes FAQ for custom cakes and delivery in Galle.'
};

const steps = [
  {
    title: 'Send A WhatsApp Message',
    body: 'Tell us your item, date, and quantity. For cakes include flavour, theme, and serving size.'
  },
  {
    title: 'Confirm Your Details',
    body: 'We confirm price in LKR, prep timing, and pickup or delivery channel.'
  },
  {
    title: 'Receive Your Order',
    body: 'Collect from our Galle locations or receive through Uber Eats or PickMe Food where available.'
  }
];

export default function OrderPage() {
  return (
    <>
      <section className="section-space bg-brand-cream">
        <div className="content-shell space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">How To Order</p>
          <h1 className="section-title text-5xl text-brand-deepBrown sm:text-6xl">No Checkout. No App Confusion. Just WhatsApp.</h1>
          <p className="max-w-2xl text-brand-textMuted">
            All Flour Dude orders are managed by direct message so details are clear and personal. This keeps custom cake requests accurate and fast.
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton label="Start Order Chat" messageType="default" />
            <WhatsAppButton label="Request Custom Cake" messageType="customCake" className="bg-brand-sage hover:bg-[#8ca27f]" />
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-card border border-brand-border bg-brand-cream p-5">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">Step {index + 1}</p>
              <h2 className="mt-2 text-xl font-semibold text-brand-deepBrown">{step.title}</h2>
              <p className="mt-2 text-sm text-brand-textMuted">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-brand-cream">
        <div className="content-shell rounded-card border border-brand-border bg-brand-warmWhite p-6 sm:p-8">
          <h2 className="section-title text-4xl text-brand-deepBrown">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-card border border-brand-border bg-brand-cream p-4">
                <summary className="cursor-pointer font-semibold text-brand-deepBrown">{faq.question}</summary>
                <p className="mt-2 text-sm text-brand-textMuted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell text-center">
          <h2 className="section-title text-4xl text-brand-warmWhite">Need Help Choosing?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-warmWhite/80">Message us with your occasion and budget and we will recommend the best options.</p>
          <div className="mt-6">
            <WhatsAppButton label="Get Recommendations On WhatsApp" messageType="default" />
          </div>
        </div>
      </section>
    </>
  );
}
