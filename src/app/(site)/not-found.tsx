import Link from 'next/link';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center bg-brand-cream pt-[var(--header-height)]">
      <div className="content-shell w-full">
        <div className="max-w-xl mx-auto text-center space-y-6 py-24">
          <p className="font-display text-[120px] leading-none text-brand-caramel/20 select-none">404</p>
          <div className="space-y-4 -mt-4">
            <h1 className="font-display text-4xl sm:text-5xl text-brand-deepBrown tracking-tight leading-tight">
              This page took the last slice.
            </h1>
            <p className="text-brand-textMuted font-light leading-relaxed">
              We could not find what you were looking for. Head back to the menu or message us directly on WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-pill border border-brand-border bg-brand-warmWhite px-6 h-12 text-sm font-medium text-brand-deepBrown transition hover:border-brand-caramel hover:text-brand-caramel"
            >
              Go to Homepage
            </Link>
            <a
              href={buildWhatsAppLink(whatsappMessages.default)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-pill px-6 h-12 bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe5d] transition-all"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
                <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
