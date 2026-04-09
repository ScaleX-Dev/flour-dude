import Link from 'next/link';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

export default function NotFound() {
  return (
    <section className="section-space bg-brand-cream">
      <div className="content-shell rounded-card border border-brand-border bg-brand-warmWhite p-8 text-center sm:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-caramel">404</p>
        <h1 className="section-title mt-3 text-5xl text-brand-deepBrown">This Page Took The Last Slice</h1>
        <p className="mx-auto mt-3 max-w-xl text-brand-textMuted">
          We could not find what you were looking for. Jump back to the menu or message us directly on WhatsApp and we will help immediately.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-button border border-brand-border bg-brand-cream px-6 py-3 text-sm font-semibold text-brand-deepBrown transition hover:border-brand-caramel"
          >
            Go To Homepage
          </Link>
          <WhatsAppButton label="Order On WhatsApp" messageType="default" />
        </div>
      </div>
    </section>
  );
}
