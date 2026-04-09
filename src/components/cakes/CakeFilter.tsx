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
  emoji: string;
  label: string;
};

type CakeFilterProps = {
  cakes: CakePortfolioItem[];
};

const pills: FilterPill[] = [
  { key: 'all', emoji: '', label: 'All' },
  { key: 'birthdays', emoji: '🎈', label: 'Birthdays' },
  { key: 'weddings', emoji: '💍', label: 'Weddings' },
  { key: 'corporate', emoji: '🏢', label: 'Corporate' },
  { key: 'kids', emoji: '👶', label: 'Kids' },
  { key: 'novelty-theme', emoji: '✨', label: 'Novelty & Theme' }
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
      <section className="bg-warmWhite py-5">
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
                      ? 'bg-caramel font-medium text-white'
                      : 'border border-borderColor text-textMuted hover:border-caramel hover:text-caramel'
                  }`}
                >
                  {pill.emoji ? <span>{pill.emoji}</span> : null}
                  <span>{pill.label}</span>
                  <span className={`text-[11px] ${isActive ? 'text-white/85' : 'text-textMuted'}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="content-shell columns-2 gap-3 md:columns-3">
          {filteredCakes.map((cake, index) => (
            <article key={cake.id} className="group relative mb-3 cursor-pointer break-inside-avoid overflow-hidden rounded-cake">
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
                className="relative overflow-hidden"
              >
                {cake.imageUrl ? (
                  <Image
                    src={cake.imageUrl}
                    alt={cake.name}
                    width={800}
                    height={1200}
                    priority={index < 4}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <div className="h-[320px] w-full bg-[#e6ddd2]" />
                )}

                <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-4 bottom-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="inline-flex origin-bottom-left scale-95 rounded-pill bg-caramel px-3 py-1.5 text-xs font-semibold text-white transition-transform duration-300 group-hover:scale-100">
                    View details
                  </span>
                </div>
              </div>

              <div className="space-y-2 bg-warmWhite p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[13px] font-semibold text-brown-deep">{cake.name}</h3>
                  <span className="rounded-pill bg-caramel/10 px-2 py-0.5 text-[10px] text-caramel">
                    {occasionLabelMap[cake.occasion] ?? 'Celebration'}
                  </span>
                </div>

                <p className="overflow-hidden text-[13px] text-textMuted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                  {cake.description ?? 'Customizable design, flavor, and finish for your celebration.'}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-[13px] text-caramel">
                    {formatPriceDisplay(cake.priceFrom ?? null, true, cake.askForPricing ?? false)}
                  </p>
                  <CakeOrderButton cakeName={cake.name} />
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
                <p className="inline-flex rounded-pill bg-caramel/20 px-2.5 py-0.5 text-xs text-caramel-light">
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

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-brown-deep px-4 py-3 md:hidden">
        <div className="mx-auto flex max-w-[680px] items-center justify-between gap-3">
          <p className="text-xs text-cream/85">Don&apos;t see what you want? We make fully custom designs.</p>
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
