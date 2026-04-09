import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DisplayHeading, MutedText, SectionHeading } from '@/components/ui/Typography';
import { getFAQs } from '@/lib/payload';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How to Order | Flour Dude',
  description: 'Simple 3-step ordering flow for custom cakes and celebrations.'
};

const steps = [
  {
    emoji: '💬',
    title: 'Message Us on WhatsApp',
    body: 'Tell us your cake idea, the date you need it, your budget, and how many people it needs to feed. Include any photos or inspiration you love.',
    cta: true
  },
  {
    emoji: '🎨',
    title: 'We Design Your Cake',
    body: 'Our baker will design your cake and share a preview with you. We refine it until you are happy. You approve before we bake.',
    cta: false
  },
  {
    emoji: '🚚',
    title: 'Fresh Delivery or Pickup',
    body: 'Your cake is baked fresh on the day. Choose pickup from our Galle location or delivery within the Galle area.',
    cta: false
  }
];

export default async function OrderPage() {
  const faqs = await getFAQs('order');

  return (
    <>
      <section className="bg-cream py-16">
        <div className="content-shell space-y-3 text-center">
          <DisplayHeading>Ordering is Simple</DisplayHeading>
          <MutedText>Three easy steps from idea to celebration</MutedText>
        </div>
      </section>

      <section className="section-space bg-warmWhite">
        <div className="content-shell space-y-8">
          {steps.map((step, index) => (
            <article key={step.title} className="relative overflow-hidden rounded-card border border-borderColor bg-cream p-8 sm:p-10">
              <p className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 font-display text-[80px] italic text-caramel/15">
                {index + 1}
              </p>
              <div className="relative z-10 ml-6 space-y-3">
                <p className="text-2xl">{step.emoji}</p>
                <h2 className="text-2xl font-semibold text-brown-deep">{step.title}</h2>
                <p className="max-w-3xl text-sm leading-relaxed text-textMuted">{step.body}</p>
                {step.cta ? (
                  <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer">
                    <Button variant="whatsapp">Start a conversation →</Button>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell rounded-card border border-caramel/40 bg-caramel/10 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-brown-deep">
            Custom cakes require a minimum of 48-72 hours notice.
            <br />
            For wedding cakes or large orders: minimum 1 week notice.
            <br />
            For same-day orders: availability not guaranteed — please WhatsApp us first.
          </p>
        </div>
      </section>

      <section className="section-space bg-warmWhite">
        <div className="content-shell space-y-5">
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-caramel py-14 text-center">
        <div className="content-shell space-y-4">
          <SectionHeading className="text-warmWhite">Ready to Order?</SectionHeading>
          <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer">
            <Button variant="whatsapp" size="lg">
              Start Your Order →
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
