'use client';

import useEmblaCarousel from 'embla-carousel-react';

type TestimonialItem = {
  id: string;
  quote: string;
  customerName: string;
  occasion: string;
  rating: number;
  cardTone: string;
};

type TestimonialsCarouselProps = {
  items: TestimonialItem[];
};

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false });

  return (
    <div ref={emblaRef} className="overflow-hidden lg:hidden">
      <div className="flex gap-4">
        {items.map((item) => (
          <article key={item.id} className={`relative min-w-0 flex-[0_0_88%] rounded-card border border-brand-border p-6 ${item.cardTone}`}>
            <p className="pointer-events-none absolute left-4 top-0 font-display text-[72px] leading-none text-brand-caramel/20">“</p>
            <p className="relative z-10 mt-6 font-display text-[15px] italic leading-relaxed text-brand-textBody">{item.quote}</p>
            <div className="mt-4 space-y-1">
              <p className="text-[13px] font-semibold text-brand-deepBrown">{item.customerName}</p>
              <p className="text-[12px] text-brand-textMuted">{item.occasion}</p>
              <p className="text-sm text-brand-caramel">{'⭐'.repeat(Math.max(1, Math.min(5, item.rating)))}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
