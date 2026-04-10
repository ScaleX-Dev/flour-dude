import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { DisplayHeading, MutedText, SectionHeading } from '@/components/ui/Typography';
import { generateMetadata } from '@/lib/metadata';
import { getFAQs } from '@/lib/payload';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

function toPlainText(value: string | Record<string, unknown>) {
  if (typeof value === 'string') {
    return value;
  }

  return '';
}

export const metadata = generateMetadata({
  title: 'How to Order a Custom Cake | Flour Dude Galle',
  description:
    'Three simple steps to order your custom cake from Flour Dude in Galle. Message on WhatsApp, approve the design, receive fresh delivery.',
  path: '/order'
});

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
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'How to Order', path: '/order' }
  ]);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: toPlainText(faq.answer)
      }
    }))
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <SchemaMarkup id="schema-breadcrumb-order" schema={breadcrumbSchema} />
      {faqs.length ? <SchemaMarkup id="schema-faq-order" schema={faqSchema} /> : null}

      <section className="content-shell mb-20 text-center max-w-3xl mx-auto space-y-6 animate-rise-in">
        <h1 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
          How It Works
        </h1>
        <h2 className="font-display text-5xl md:text-6xl lg:text-[72px] text-brand-deepBrown tracking-tighter leading-[1.1]">
          Seamless Ordering
        </h2>
        <p className="text-lg md:text-xl font-light text-brand-textMuted leading-relaxed max-w-2xl mx-auto">
          Three simple steps to bring your dream cake to life. From ideation to celebration, we make the process effortless.
        </p>
      </section>

      <section className="content-shell max-w-4xl mx-auto space-y-8 mb-24">
        {steps.map((step, index) => (
          <article 
            key={step.title} 
            className="group relative overflow-hidden rounded-[32px] border border-brand-border/40 bg-white p-8 md:p-12 shadow-sm hover:shadow-floating hover:border-brand-border transition-all duration-500 animate-rise-in"
            style={{ animationDelay: `${(index + 1) * 150}ms` }}
          >
            <div className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 font-display text-[160px] md:text-[200px] leading-none text-brand-cream group-hover:text-brand-caramel/10 transition-colors duration-700">
              0{index + 1}
            </div>
            
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="w-16 h-16 rounded-[20px] bg-brand-cream border border-brand-border/50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                {step.emoji}
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-3xl md:text-4xl text-brand-deepBrown tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg font-light leading-relaxed text-brand-textMuted">
                  {step.body}
                </p>
              </div>
              
              {step.cta ? (
                <div className="pt-4">
                  <a href={buildWhatsAppLink(whatsappMessages.customCake)} target="_blank" rel="noreferrer" className="inline-block">
                    <Button className="rounded-pill px-8 h-14 bg-brand-deepBrown text-white hover:bg-brand-caramel transition-colors font-medium tracking-wide">
                      Start a conversation →
                    </Button>
                  </a>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="content-shell max-w-4xl mx-auto mb-24">
        <div className="relative overflow-hidden rounded-[32px] bg-brand-deepBrown p-8 md:p-12 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 space-y-4 font-light text-lg md:text-xl leading-relaxed text-white/90">
            <p>
              Custom cakes require a minimum of <strong className="font-medium text-brand-caramel">48-72 hours notice</strong>.
            </p>
            <p>
              For wedding cakes or large orders: <strong className="font-medium text-brand-caramel">minimum 1 week notice</strong>.
            </p>
            <p className="text-base text-white/70 mt-6 pt-6 border-t border-white/10">
              For same-day orders: availability not guaranteed — please WhatsApp us first.
            </p>
          </div>
        </div>
      </section>

      <section className="content-shell max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-brand-caramel">
            Support
          </h2>
          <h3 className="font-display text-4xl md:text-5xl text-brand-deepBrown tracking-tight leading-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/40 shadow-sm">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={String(faq.id)}
                className="border-b border-brand-border/40 px-2 last:border-0 data-[state=open]:bg-brand-cream/30 rounded-[16px] transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-6 font-display flex-1 flex justify-between text-left text-xl text-brand-deepBrown hover:text-brand-caramel transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-textBody font-light leading-relaxed pb-6 pr-8">
                  {toPlainText(faq.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
