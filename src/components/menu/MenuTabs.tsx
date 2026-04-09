'use client';

import { useMemo, useState } from 'react';
import { formatLkr } from '@/lib/site';

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
    <section className="space-y-5">
      <div className="no-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2 pb-1">
        {categories.map((entry) => {
          const isActive = entry.slug === activeCategory;

          return (
            <button
              key={entry.slug}
              type="button"
              onClick={() => setActiveCategory(entry.slug)}
              className={`whitespace-nowrap rounded-pill border px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? 'border-brand-caramel bg-brand-caramel text-brand-warmWhite'
                  : 'border-brand-border bg-brand-warmWhite text-brand-textBody hover:border-brand-caramelLight'
              }`}
            >
              {entry.name}
            </button>
          );
        })}
      </div>

      <div className="rounded-card border border-brand-border bg-brand-warmWhite p-5 sm:p-7">
        <h2 className="section-title text-3xl text-brand-deepBrown">{category?.name}</h2>
        <p className="mt-2 text-sm text-brand-textMuted">{category?.description}</p>

        <div className="mt-6 grid gap-3">
          {filteredItems.map((item) => (
            <article
              key={item.name}
              className="rounded-card border border-brand-border/80 bg-brand-cream/50 p-4 sm:flex sm:items-start sm:justify-between"
            >
              <div>
                <h3 className="font-semibold text-brand-textBody">{item.name}</h3>
                {item.description ? (
                  <p className="mt-1 max-w-xl text-sm text-brand-textMuted">{item.description}</p>
                ) : null}
                {item.isFeatured ? (
                  <span className="mt-2 inline-flex rounded-pill bg-brand-sage/20 px-3 py-1 text-xs font-medium text-brand-sage">
                    Chef pick
                  </span>
                ) : null}
              </div>
              {typeof item.price === 'number' ? (
                <p className="mt-3 text-sm font-semibold text-brand-deepBrown sm:mt-0">{formatLkr(item.price)}</p>
              ) : (
                <p className="mt-3 text-sm font-semibold text-brand-rose sm:mt-0">Custom quote</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
