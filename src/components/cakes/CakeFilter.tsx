'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { formatPriceDisplay } from '@/lib/formatting';
import { WA } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { CakeOrderButton } from '@/components/ui/CakeOrderButton';
import type { CakePortfolioItem } from '@/payload-types';

type CakeItem = {
  id: string | number;
  name: string;
  description?: string;
  imageUrl?: string;
  priceFrom?: number;
  askForPricing?: boolean;
  featured?: boolean;
  createdAt?: string;
  occasion: string;
};

type FilterPill = {
  key: string;
  label: string;
};

type CakeFilterProps = {
  cakes: CakePortfolioItem[];
};

const pills: FilterPill[] = [
  { key: 'all', label: 'All' },
  { key: 'birthdays', label: 'Birthdays' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'kids', label: 'Kids' },
  { key: 'novelty-theme', label: 'Novelty & Theme' }
];

const occasionLabelMap: Record<string, string> = {
  birthdays: 'Birthdays',
  weddings: 'Weddings',
  corporate: 'Corporate',
  kids: 'Kids',
  'novelty-theme': 'Novelty & Theme'
};

function normalizeOccasion(value: string): string {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return occasionLabelMap[normalized] ? normalized : 'birthdays';
}

function getCakeWhatsappHref(cakeName: string): string {
  return WA.cakeOrder(cakeName);
}

export function CakeFilter({ cakes }: CakeFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryOccasion = searchParams.get('occasion');
  const initialOccasion = queryOccasion ? normalizeOccasion(queryOccasion) : 'all';

  const [activeOccasion, setActiveOccasion] = useState<string>(initialOccasion);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(-1);

  const normalizedCakes = useMemo(
    () =>
      cakes.map((cake, index) => {
        const firstPhoto = Array.isArray(cake.photos) ? cake.photos[0] : null;
        const imageUrl =
          typeof firstPhoto?.image === 'object' && firstPhoto.image
            ? firstPhoto.image.url ?? undefined
            : typeof cake.image === 'object' && cake.image
              ? cake.image.url ?? undefined
              : undefined;

        const occasion = Array.isArray(cake.occasion_tags) && cake.occasion_tags[0]
          ? cake.occasion_tags[0]
          : 'birthdays';

        const showPriceToggle =
          typeof cake.show_price === 'boolean' ? cake.show_price : true;

        return {
          id: cake.id,
          name: cake.name ?? cake.title ?? `Cake ${index + 1}`,
          description: cake.description ?? undefined,
          imageUrl,
          priceFrom:
            typeof cake.starting_price === 'number'
              ? cake.starting_price
              : typeof cake.priceFrom === 'number'
                ? cake.priceFrom
                : undefined,
          askForPricing: !showPriceToggle,
          featured: cake.featured ?? false,
          createdAt: cake.createdAt,
          occasion: normalizeOccasion(occasion)
        } as CakeItem;
      }),
    [cakes]
  );

  const filteredCakes = useMemo(() => {
    if (activeOccasion === 'all') {
      return normalizedCakes;
    }

    return normalizedCakes.filter((cake) => cake.occasion === activeOccasion);
  }, [activeOccasion, normalizedCakes]);

  const lightboxSlides = useMemo(
    () =>
      filteredCakes.map((cake) => ({
        src: cake.imageUrl ?? '/favicon.ico',
        alt: cake.name,
        width: 1200,
        height: 1600
      })),
    [filteredCakes]
  );

  const activeCake = activeSlideIndex >= 0 ? filteredCakes[activeSlideIndex] : null;

  function updateFilter(nextOccasion: string) {
    setActiveOccasion(nextOccasion);

    const params = new URLSearchParams(searchParams.toString());
    if (nextOccasion === 'all') {
      params.delete('occasion');
    } else {
      params.set('occasion', nextOccasion);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <>
      <section className="bg-brand-warmWhite py-5">
        <div className="content-shell">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap md:overflow-visible">
            {pills.map((pill) => {
              const count =
                pill.key === 'all'
                  ? normalizedCakes.length
                  : normalizedCakes.filter((cake) => cake.occasion === pill.key).length;
              const isActive = activeOccasion === pill.key;

              return (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => updateFilter(pill.key)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-4 py-1.5 text-[13px] transition ${
                    isActive
                      ? 'bg-brand-caramel font-medium text-white'
                      : 'border border-brand-border text-brand-textMuted hover:border-brand-caramel hover:text-brand-caramel'
                  }`}
                >
                  <span>{pill.label}</span>
                  <span className={`text-[11px] ${isActive ? 'text-white/85' : 'text-brand-textMuted'}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-cream">
        <div className="content-shell grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCakes.map((cake, index) => (
            <article key={cake.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-brand-caramel/10 transition-all duration-300 hover:border-brand-caramel/30 hover:shadow-lg">
              {/* Image Container */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveSlideIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveSlideIndex(index);
                  }
                }}
                className="relative overflow-hidden bg-brand-warmWhite"
              >
                {cake.imageUrl ? (
                  <Image
                    src={cake.imageUrl}
                    alt={cake.name}
                    width={600}
                    height={600}
                    priority={index < 4}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="aspect-square w-full bg-brand-caramel/5" />
                )}

                {/* Hover Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="inline-flex rounded-pill bg-brand-caramel px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                    View Gallery
                  </span>
                </div>
              </div>

              {/* Content Container - grows to fill space */}
              <div className="flex flex-1 flex-col justify-between gap-3 bg-brand-warmWhite p-4 sm:p-5">
                {/* Header with Title and Occasion Tag */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold leading-tight text-brand-deepBrown sm:text-lg">
                      {cake.name}
                    </h3>
                  </div>
                  <div className="inline-block">
                    <span className="rounded-full bg-brand-caramel/15 px-3 py-1 text-xs font-semibold text-brand-caramel">
                      {occasionLabelMap[cake.occasion] ?? 'Celebration'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-brand-textMuted line-clamp-2">
                  {cake.description ?? 'Customizable design, flavor, and finish for your celebration.'}
                </p>

                {/* Price and Button - stacked on mobile, side-by-side on larger screens */}
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-display text-lg font-bold text-brand-caramel">
                    {formatPriceDisplay(cake.priceFrom ?? null, true, cake.askForPricing ?? false)}
                  </p>
                  <div className="w-full sm:w-auto">
                    <CakeOrderButton cakeName={cake.name} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Lightbox
        open={activeSlideIndex >= 0}
        close={() => setActiveSlideIndex(-1)}
        index={activeSlideIndex >= 0 ? activeSlideIndex : 0}
        slides={lightboxSlides}
        on={{
          view: ({ index }) => setActiveSlideIndex(index)
        }}
        carousel={{
          finite: false
        }}
      />

      {activeCake ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] px-4">
          <div className="mx-auto w-full max-w-3xl rounded-card bg-black/55 p-4 text-white backdrop-blur-sm pointer-events-auto">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-lg font-semibold">{activeCake.name}</p>
                <p className="inline-flex rounded-pill bg-brand-caramel/20 px-2.5 py-0.5 text-xs text-brand-caramel">
                  {occasionLabelMap[activeCake.occasion] ?? 'Celebration'}
                </p>
                <p className="max-w-xl text-sm text-white/85">
                  {activeCake.description ?? 'Customizable design, flavor, and finish for your celebration.'}
                </p>
              </div>

              <a href={getCakeWhatsappHref(activeCake.name)} target="_blank" rel="noreferrer">
                <Button variant="whatsapp" size="sm">
                  Order This Style
                </Button>
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-brand-deepBrown px-4 py-3 md:hidden">
        <div className="mx-auto flex max-w-[680px] items-center justify-between gap-3">
          <p className="text-xs text-brand-cream/85">Don&apos;t see what you want? We make fully custom designs.</p>
          <Link href={WA.customCake()} target="_blank" rel="noreferrer">
            <Button variant="whatsapp" size="sm" className="whitespace-nowrap">
              Chat with us →
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
