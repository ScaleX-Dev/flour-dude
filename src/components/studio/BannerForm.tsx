'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ImageUploader } from '@/components/studio/ImageUploader';
import { createBanner, updateBanner, type BannerItem } from '@/lib/studio-api';

const BANNER_TYPES = [
  { value: 'seasonal', label: 'Seasonal Offer' },
  { value: 'homepage', label: 'Homepage' },
  { value: 'menu', label: 'Menu' },
  { value: 'global', label: 'Global (all pages)' },
];

interface BannerFormProps {
  initialData?: BannerItem | null;
}

export function BannerForm({ initialData }: BannerFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const existingImageUrl =
    typeof initialData?.image === 'object' && initialData.image
      ? (initialData.image.url ?? null)
      : null;

  const [headline, setHeadline] = useState(initialData?.headline ?? '');
  const [subHeadline, setSubHeadline] = useState(initialData?.sub_headline ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [ctaText, setCtaText] = useState(initialData?.cta_text ?? '');
  const [ctaUrl, setCtaUrl] = useState(initialData?.cta_url ?? '');
  const [active, setActive] = useState(initialData?.active ?? false);
  const [expiresAt, setExpiresAt] = useState(
    initialData?.expires_at ? initialData.expires_at.split('T')[0] : ''
  );
  const [bannerType, setBannerType] = useState<string>(
    initialData?.banner_type ?? 'seasonal'
  );
  const [imageId, setImageId] = useState<number | null>(
    typeof initialData?.image === 'object' && initialData.image
      ? initialData.image.id
      : null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!headline.trim()) {
      setError('Headline is required.');
      return;
    }

    setSaving(true);

    try {
      const payload: Record<string, unknown> = {
        headline: headline.trim(),
        sub_headline: subHeadline.trim() || null,
        description: description.trim() || null,
        cta_text: ctaText.trim() || null,
        cta_url: ctaUrl.trim() || null,
        active,
        expires_at: expiresAt || null,
        banner_type: bannerType,
        image: imageId ?? null,
      };

      if (isEdit && initialData?.id) {
        await updateBanner(initialData.id, payload);
      } else {
        await createBanner(payload);
      }

      router.push('/studio/banners');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Content */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Banner Content
        </h3>

        {/* Headline */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Headline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Eid Special — 20% Off All Cakes"
            maxLength={80}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all"
          />
          <p className="text-xs text-gray-400">{headline.length}/80 characters</p>
        </div>

        {/* Sub-headline */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Sub-headline</label>
          <input
            type="text"
            value={subHeadline}
            onChange={(e) => setSubHeadline(e.target.value)}
            placeholder="e.g. Valid 1–10 April · Use code EID2024"
            maxLength={140}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Additional details about this offer…"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all resize-none"
          />
        </div>

        {/* Image */}
        <ImageUploader
          existingUrl={existingImageUrl}
          onUploaded={(id) => setImageId(id)}
          onClear={() => setImageId(null)}
          label="Banner Image"
        />
      </section>

      {/* CTA */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Call to Action
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g. Order Now"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Button URL</label>
            <input
              type="text"
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              placeholder="e.g. /cakes or https://wa.me/…"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all"
            />
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Settings
        </h3>

        {/* Banner type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Banner Type</label>
          <div className="grid grid-cols-2 gap-2">
            {BANNER_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setBannerType(type.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                  bannerType === type.value
                    ? 'bg-brand-deepBrown text-white border-brand-deepBrown'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active toggle */}
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-gray-700">Active</p>
            <p className="text-xs text-gray-400">Banner is visible to site visitors</p>
          </div>
          <div
            onClick={() => setActive((v) => !v)}
            className={`w-12 h-7 rounded-full transition-colors flex items-center px-0.5 flex-shrink-0 ${
              active ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${
                active ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </label>

        {/* Expiry date */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date{' '}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full sm:w-auto px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-caramel hover:bg-brand-caramelLight text-white font-semibold py-3 px-8 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Banner'}
        </button>
      </div>
    </form>
  );
}
