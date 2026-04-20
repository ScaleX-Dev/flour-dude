'use client';

import { useMemo, useState } from 'react';
import { formatLKR } from '@/lib/formatting';

type Category = {
  slug: string;
  name: string;
  description?: string | null;
};

type Item = {
  categorySlug: string;
  name: string;
  description?: string | null;
  price?: number;
  isFeatured?: boolean;
};

type MenuTabsProps = {
  categories: Category[];
  items: Item[];
};

export function MenuTabs({ categories, items }: MenuTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug ?? '');

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.categorySlug === activeCategory);
  }, [activeCategory, items]);

  const category = categories.find((entry) => entry.slug === activeCategory);

  return (
    <section className="space-y-12">
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 border-b border-brand-border/40 justify-start md:justify-center">
        {categories.map((entry) => {
          const isActive = entry.slug === activeCategory;

          return (
            <button
              key={entry.slug}
              type="button"
              onClick={() => setActiveCategory(entry.slug)}
              className={`whitespace-nowrap px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all relative ${
                isActive
                  ? 'text-brand-deepBrown'
                  : 'text-brand-textMuted hover:text-brand-caramel'
              }`}
            >
              {entry.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-deepBrown rounded-t-full"></span>
              )}
            </button>
          );
        })}
      </div>

      <div className="rounded-card p-6 sm:p-10 border border-brand-border bg-brand-warmWhite shadow-soft">
        <div className="max-w-2xl">
           <h2 className="font-display text-4xl text-brand-deepBrown pb-2">{category?.name}.</h2>
           <p className="mt-2 text-lg font-light text-brand-textMuted max-w-xl">{category?.description}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredItems.map((item) => (
            <article
              key={item.name}
              className="group flex flex-col justify-between rounded-[20px] border border-transparent bg-brand-cream/50 hover:bg-brand-warmWhite hover:border-brand-border hover:shadow-floating p-8 transition-all duration-500"
            >
              <div className="space-y-4">
                {item.isFeatured ? (
                  <span className="inline-flex rounded-full bg-brand-caramel/10 border border-brand-caramel/20 px-3 py-1 text-xs font-semibold tracking-wide text-brand-caramel uppercase">
                    Chef&apos;s Choice
                  </span>
                ) : null}
                <div className="flex items-start justify-between gap-6">
                   <h3 className="font-display text-xl text-brand-deepBrown group-hover:text-brand-caramel transition-colors">{item.name}</h3>
                   <p className="font-sans text-lg font-medium text-brand-deepBrown shrink-0">{formatLKR(item.price ?? 0)}</p>
                </div>
                {item.description ? (
                   <p className="text-base font-light text-brand-textMuted leading-relaxed">{item.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
