import Image from 'next/image';
import Link from 'next/link';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFab';
import { SchemaMarkup, buildBreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { generateMetadata } from '@/lib/metadata';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';
import { WA } from '@/lib/whatsapp';

export const metadata = generateMetadata({
  title: 'About Flour Dude — Our Story · Galle Bakery',
  description:
    "Meet the team behind Flour Dude — Galle's most celebrated bakery and custom cake studio. Baked with love every day.",
  path: '/about'
});

export default async function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ]);

  return (
    <>
      <SchemaMarkup id="schema-breadcrumb-about" schema={breadcrumbSchema} />
      <WhatsAppFAB />

      {/* ───── HERO ───── */}
      <section className="relative h-[calc(520px+var(--header-height))] md:h-[calc(600px+var(--header-height))] overflow-hidden bg-brand-deepBrown text-white flex flex-col justify-end pb-16 md:pb-28 pt-[calc(var(--header-height)+2.5rem)]">
        <Image
          src="/images/IMG_5416.JPG"
          alt="Flour Dude founder in the kitchen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50 scale-105 animate-[ken-burns_30s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBrown via-brand-deepBrown/55 to-transparent" />

        <div className="relative z-10 w-full animate-rise-in px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-3xl space-y-5">
            <p className="font-sans text-xs font-semibold tracking-[0.22em] uppercase text-brand-caramel">
              Our Story · Galle, Sri Lanka
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[68px] lg:text-[76px] tracking-tighter text-white leading-[1.02]">
              Built From a Home,<br className="hidden sm:block" /> Meant for you to stay.
            </h1>
          </div>
        </div>
      </section>

      {/* ───── STORY BODY ───── */}
      <section className="bg-brand-cream border-b border-brand-border">
        <div className="content-shell max-w-3xl mx-auto py-20 md:py-28 space-y-20">

          {/* Opening */}
          <div className="space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-deepBrown tracking-tight leading-tight">
              We Changed a Home<br /> Into Ours.
            </h2>
            <p className="text-base sm:text-lg font-light text-brand-textMuted leading-relaxed">
              The story of Flour Dude isn&apos;t really about baking. It&apos;s about a group of friends who needed somewhere to belong — and decided to build it themselves.
            </p>
          </div>

          <hr className="border-brand-border/60" />

          {/* Section 1 */}
          <div className="space-y-6">
            <h3 className="font-display italic text-3xl sm:text-4xl text-brand-deepBrown leading-snug">
              A cafe was always a kind of home.
            </h3>
            <div className="space-y-5 text-base sm:text-[17px] font-light text-brand-textMuted leading-relaxed">
              <p>
                Long before Flour Dude had a name, it had a feeling. Good people. Good food. A table where no one was in a rush to leave. That was what a cafe meant — not a transaction, but a place that felt like yours.
              </p>
              <p>
                So when it came to figuring out what to do with that feeling, baking made sense. Friends kept coming back. They&apos;d sit there and say, half-joking, <em>&ldquo;this should be a cafe.&rdquo;</em>
              </p>
            </div>

            <blockquote className="border-l-2 border-brand-caramel pl-6 py-1">
              <p className="font-light text-base sm:text-lg text-brand-deepBrown leading-relaxed">
                So with the help of family and the people who&apos;d been there since the beginning — we changed a home into ours.
              </p>
            </blockquote>
          </div>

          <hr className="border-brand-border/60" />

          {/* Section 2 */}
          <div className="space-y-6">
            <h3 className="font-display italic text-3xl sm:text-4xl text-brand-deepBrown leading-snug">
              The small things are the whole thing.
            </h3>
            <div className="space-y-5 text-base sm:text-[17px] font-light text-brand-textMuted leading-relaxed">
              <p>
                From the beginning, the goal was never to open another bakery. It was to make food that was honest — the kind you&apos;d actually be proud to hand to someone.
              </p>
              <p>
                That means caring about the texture of a sponge. The balance of sweetness in a ganache. Whether something tastes as good on the last bite as the first. When something is made with care, people can taste the difference.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ───── CLOSING CTA ───── */}
      <section className="bg-brand-warmWhite border-t border-brand-border py-24 md:py-32">
        <div className="content-shell max-w-3xl mx-auto space-y-8">
          <h2 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-brand-deepBrown tracking-tight leading-tight">
            Come be part of it.
          </h2>
          <p className="text-base sm:text-lg font-light text-brand-textMuted leading-relaxed max-w-xl">
            Walk in for coffee and something fresh. Or WhatsApp us about the cake that&apos;s going to make your next celebration unforgettable. Either way, we&apos;re glad you&apos;re here.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
            <a
              href={WA.customCake()}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="rounded-pill px-8 h-12 bg-brand-caramel text-white hover:bg-brand-deepBrown transition-all font-medium tracking-wide">
                Order on WhatsApp
              </Button>
            </a>
            <Link href="/cakes">
              <Button variant="outline" className="rounded-pill px-8 h-12 border-brand-deepBrown/30 text-brand-deepBrown hover:bg-brand-deepBrown hover:text-white transition-all font-medium tracking-wide">
                See Our Cakes →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
