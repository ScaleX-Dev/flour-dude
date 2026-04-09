import type { Metadata } from 'next';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { MenuTabs } from '@/components/menu/MenuTabs';
import { menuCategories, menuItems } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cafe Menu In LKR',
  description: 'Browse Flour Dude menu categories, prices in LKR, and WhatsApp to order in Galle via pickup or delivery.'
};

export default function MenuPage() {
  return (
    <>
      <section className="section-space bg-brand-cream">
        <div className="content-shell space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">Daily Cafe Menu</p>
          <h1 className="section-title text-5xl text-brand-deepBrown sm:text-6xl">Fresh Bakes, Waffles, Wraps, Coffee</h1>
          <p className="max-w-2xl text-brand-textMuted">
            All prices are shown in LKR. Daily menu is available for delivery through Uber Eats and PickMe Food in Galle.
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton label="Order By WhatsApp" messageType="default" />
            <WhatsAppButton
              label="Order A Cake"
              customMessage="Hi Flour Dude! I'd like to order a [CAKE NAME]. Can you help?"
              className="bg-brand-sage hover:bg-[#8ca27f]"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-warmWhite">
        <div className="content-shell">
          <MenuTabs categories={menuCategories} items={menuItems} />
        </div>
      </section>

      <section className="section-space bg-brand-deepBrown text-brand-warmWhite">
        <div className="content-shell rounded-card border border-white/15 p-6 text-center sm:p-8">
          <h2 className="section-title text-4xl text-brand-warmWhite">Need A Custom Item Or Bulk Box?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-warmWhite/80">
            Tell us your event size and timing. We can tailor items for meetings, birthdays, and celebrations.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton label="Request Custom Cake" messageType="customCake" />
            <WhatsAppButton label="Request Catering Quote" messageType="b2b" className="bg-brand-rose hover:bg-[#e5a592]" />
          </div>
        </div>
      </section>
    </>
  );
}
