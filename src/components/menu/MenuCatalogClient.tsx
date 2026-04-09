'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { trackDeliveryClick } from '@/lib/analytics';
import { formatLkr } from '@/lib/site';

type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
};

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  categorySlug: string;
  sortOrder: number;
  imageUrl?: string;
  available: boolean;
  badge?: string;
  dietaryTags: string[];
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
        onClick={() => trackDeliveryClick('uber-eats', placement)}
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
        onClick={() => trackDeliveryClick('pickme-food', placement)}
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
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.sortOrder - b.sortOrder),
    [categories]
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
    const list = [...items].sort((a, b) => a.sortOrder - b.sortOrder);

    if (activeTab === 'all') {
      return list;
    }

    return list.filter((item) => normalizeSlug(item.categorySlug) === activeTab);
  }, [activeTab, items]);

  return (
    <>
      <div className="sticky top-[var(--header-height)] z-10 border-b border-borderColor bg-warmWhite">
        <div className="content-shell">
          <div className="no-scrollbar -mx-2 flex overflow-x-auto px-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`mr-6 whitespace-nowrap border-b-2 py-4 text-sm transition ${
                    isActive
                      ? 'border-caramel text-caramel font-medium'
                      : 'border-transparent text-textMuted hover:text-textBody'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="section-space bg-warmWhite">
        <div className="content-shell grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const emoji = categoryEmoji({ slug: normalizeSlug(item.categorySlug), name: item.categorySlug });

            return (
              <article key={item.id} className="relative overflow-hidden rounded-cake border border-borderColor bg-warmWhite shadow-soft">
                {item.badge ? (
                  <span className="absolute right-3 top-3 z-[2] rounded-pill bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    {item.badge}
                  </span>
                ) : null}

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-cake bg-[#ece4dc]">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl">{emoji}</div>
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[15px] font-bold text-brown-deep">{item.name}</h3>
                    <span
                      className={`inline-flex shrink-0 rounded-pill px-2.5 py-1 text-xs font-medium ${
                        item.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {item.available ? 'Available' : 'Sold Out'}
                    </span>
                  </div>

                  {item.dietaryTags.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.dietaryTags.map((tag) => (
                        <span key={`${item.id}-${tag}`} className="rounded-pill bg-sage/10 px-2.5 py-1 text-xs text-sage">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <p className="overflow-hidden text-[13px] text-textMuted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {truncateDescription(item.description)}
                  </p>

                  <p
                    className={`font-display text-[17px] text-caramel ${
                      item.available ? '' : 'line-through text-red-600/80'
                    }`}
                  >
                    {formatLkr(item.price)}
                  </p>
                </div>
              </article>
            );
          })}
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
