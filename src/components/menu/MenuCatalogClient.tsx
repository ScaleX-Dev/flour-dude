'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { trackDeliveryClick } from '@/lib/analytics';
import { formatLKR } from '@/lib/formatting';

type MenuCategory = {
  id: string | number;
  name: string;
  slug?: string | null;
  description?: string | null;
  sortOrder?: number;
  sort_order?: number | null;
};

type MenuItem = {
  id: string | number;
  name: string;
  description?: string | null;
  price?: number;
  price_lkr?: number;
  categorySlug?: string;
  sortOrder?: number;
  sort_order?: number | null;
  imageUrl?: string;
  photo?: { url?: string | null } | number | null;
  available?: boolean | null;
  badge?: string | null;
  allergens?: string[] | null;
  dietaryTags?: string[];
  category?: { slug?: string | null; name?: string | null } | number | null;
};

type MenuCatalogClientProps = {
  categories: MenuCategory[];
  items: MenuItem[];
  uberEatsUrl: string;
  pickMeUrl: string;
  heroCtaId?: string;
};

type TabItem = {
  key: string;
  label: string;
};

const tabEmojiMap: Record<string, string> = {
  cakes: '🎂',
  waffles: '🧇',
  'wraps-sandwiches': '🥪',
  'coffee-tea': '☕',
  'chocolate-drinks': '🍫'
};

const emojiByName: Record<string, string> = {
  cakes: '🎂',
  waffles: '🧇',
  'wraps & sandwiches': '🥪',
  'coffee & tea': '☕',
  'chocolate drinks': '🍫'
};

function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function categoryEmoji(item: { slug: string; name: string }): string {
  return tabEmojiMap[item.slug] ?? emojiByName[item.name.toLowerCase()] ?? '🍽️';
}

function truncateDescription(value: string | undefined): string {
  if (!value) {
    return 'Freshly made in our Galle kitchen.';
  }

  if (value.length <= 80) {
    return value;
  }

  return `${value.slice(0, 80).trimEnd()}...`;
}

  function normalizeNullableText(value: string | null | undefined): string | undefined {
    return typeof value === 'string' ? value : undefined;
  }

function UberEatsLogo() {
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="h-4 w-4" fill="none">
      <rect x="1" y="1" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 9.5h2v6H6zm3.5-2h2v8h-2zm3.5 3h2v5h-2z" fill="currentColor" />
    </svg>
  );
}

function PickMeLogo() {
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="h-4 w-4" fill="none">
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 15V7h4.1c2.3 0 3.9 1 3.9 3.2 0 2.1-1.6 3.1-3.8 3.1H9.1V15H7Z" fill="currentColor" />
    </svg>
  );
}

export function DeliveryOrderButtons({
  uberEatsUrl,
  pickMeUrl,
  placement,
  compact = false
}: {
  uberEatsUrl: string;
  pickMeUrl: string;
  placement: 'hero' | 'sticky-mobile';
  compact?: boolean;
}) {
  return (
    <div className="flex w-full flex-wrap gap-3 sm:flex-nowrap">
      <a
        href={uberEatsUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackDeliveryClick('uber_eats')}
        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-button bg-[#FF6600] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105 ${
          compact ? 'min-h-[44px]' : 'min-h-[48px]'
        }`}
      >
        <UberEatsLogo />
        <span>Order on Uber Eats</span>
      </a>

      <a
        href={pickMeUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackDeliveryClick('pickme')}
        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-button bg-[#E31837] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105 ${
          compact ? 'min-h-[44px]' : 'min-h-[48px]'
        }`}
      >
        <PickMeLogo />
        <span>Order on PickMe Food</span>
      </a>
    </div>
  );
}

export function MenuCatalogClient({
  categories,
  items,
  uberEatsUrl,
  pickMeUrl,
  heroCtaId = 'menu-hero-ctas'
}: MenuCatalogClientProps) {
  const normalizedCategories = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        slug: category.slug ?? normalizeSlug(category.name),
        sortOrder:
          typeof category.sortOrder === 'number'
            ? category.sortOrder
            : typeof category.sort_order === 'number'
              ? category.sort_order
              : 0
      })),
    [categories]
  );

  const sortedCategories = useMemo(
    () => [...normalizedCategories].sort((a, b) => a.sortOrder - b.sortOrder),
    [normalizedCategories]
  );

  const normalizedItems = useMemo(
    () =>
      items.map((item) => {
        const categoryFromRelation =
          typeof item.category === 'object' && item.category
            ? item.category.slug ?? normalizeSlug(item.category.name ?? 'all')
            : undefined;

        const categorySlug =
          item.categorySlug ?? categoryFromRelation ?? 'all';

        const photoUrl =
          item.imageUrl ??
          (typeof item.photo === 'object' && item.photo ? item.photo.url ?? undefined : undefined);

        return {
          ...item,
          categorySlug,
          sortOrder:
            typeof item.sortOrder === 'number'
              ? item.sortOrder
              : typeof item.sort_order === 'number'
                ? item.sort_order
                : 0,
          price:
            typeof item.price === 'number'
              ? item.price
              : typeof item.price_lkr === 'number'
                ? item.price_lkr
                : 0,
          available: item.available ?? true,
          dietaryTags: item.dietaryTags ?? item.allergens ?? [],
          imageUrl: photoUrl
        };
      }),
    [items]
  );

  const tabs = useMemo<TabItem[]>(() => {
    const cmsTabs = sortedCategories
      .filter((category) => Boolean(tabEmojiMap[normalizeSlug(category.slug)] || emojiByName[category.name.toLowerCase()]))
      .map((category) => {
        const slug = normalizeSlug(category.slug);
        const emoji = categoryEmoji({ slug, name: category.name });

        return {
          key: slug,
          label: `${emoji} ${category.name}`
        };
      });

    return [{ key: 'all', label: 'All' }, ...cmsTabs];
  }, [sortedCategories]);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    const target = document.getElementById(heroCtaId);
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setShowMobileBar(!entry.isIntersecting);
      },
      {
        threshold: 0.05
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [heroCtaId]);

  const filteredItems = useMemo(() => {
    const list = [...normalizedItems].sort((a, b) => a.sortOrder - b.sortOrder);

    if (activeTab === 'all') {
      return list;
    }

    return list.filter((item) => normalizeSlug(item.categorySlug) === activeTab);
  }, [activeTab, normalizedItems]);

  return (
    <>
      <div className="sticky top-[var(--header-height)] z-10 border-b border-brand-border/40 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="content-shell">
          <div className="no-scrollbar -mx-2 flex overflow-x-auto px-2 justify-start md:justify-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`mr-8 whitespace-nowrap px-2 py-[22px] text-[13px] font-sans uppercase tracking-[0.1em] font-medium transition-all relative ${
                    isActive
                      ? 'text-brand-caramel'
                      : 'text-brand-textMuted hover:text-brand-deepBrown'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-caramel rounded-t-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="section-space bg-brand-cream">
        <div className="content-shell">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
            {filteredItems.map((item, index) => {
              const emoji = categoryEmoji({ slug: normalizeSlug(item.categorySlug), name: item.categorySlug });

              return (
                <article
                  key={item.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="group flex flex-col text-left gap-4 animate-rise-in fill-mode-both"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-white border border-transparent group-hover:border-brand-border/80 shadow-sm transition-all duration-500">
                    {!item.available ? (
                      <span className="absolute left-4 top-4 z-10 rounded-pill bg-brand-deepBrown px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-white">
                        Sold Out
                      </span>
                    ) : null}

                    {item.badge ? (
                      <span className="absolute right-4 top-4 z-10 inline-flex bg-brand-caramel text-white px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md backdrop-blur-md">
                        {item.badge}
                      </span>
                    ) : null}

                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-cream">
                        <span className="text-4xl opacity-50 grayscale">{emoji}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-brand-deepBrown/5 opacity-0 group-hover:opacity-100 mix-blend-multiply transition-opacity duration-500" />
                  </div>

                  <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-display text-[22px] tracking-tight text-brand-deepBrown group-hover:text-brand-caramel transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-sans text-[15px] font-medium text-brand-deepBrown shrink-0 pt-1">
                        {formatLKR(item.price ?? 0)}
                      </p>
                    </div>
                    
                    <p className="text-[14px] text-brand-textMuted font-light leading-relaxed mb-4">
                      {truncateDescription(normalizeNullableText(item.description))}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-border/40">
                      <div className="flex flex-wrap gap-1.5">
                        {item.dietaryTags.map((tag) => (
                          <span key={`${item.id}-${tag}`} className="inline-flex rounded-full bg-brand-sage/10 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-brand-sage">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {!item.available ? (
                        <span className="text-xs text-red-500 font-semibold tracking-wide uppercase">Unavailable</span>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {showMobileBar ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-borderColor bg-warmWhite px-4 py-3 md:hidden">
          <DeliveryOrderButtons
            uberEatsUrl={uberEatsUrl}
            pickMeUrl={pickMeUrl}
            placement="sticky-mobile"
            compact
          />
        </div>
      ) : null}
    </>
  );
}
