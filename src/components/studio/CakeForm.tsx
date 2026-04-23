'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2, Star } from 'lucide-react';
import { ImageUploader } from '@/components/studio/ImageUploader';
import { createCake, updateCake, type CakeItem } from '@/lib/studio-api';

const OCCASION_OPTIONS = [
  { value: 'birthdays', label: 'Birthdays' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'kids', label: 'Kids' },
  { value: 'novelty', label: 'Novelty & Theme' },
];

interface PhotoSlot {
  mediaId: number | null;
  previewUrl: string | null;
}

function initPhotos(cake?: CakeItem | null): PhotoSlot[] {
  if (!cake?.photos?.length) return [{ mediaId: null, previewUrl: null }];
  return cake.photos.map((p) => ({
    mediaId: typeof p.image === 'object' && p.image ? p.image.id : null,
    previewUrl: typeof p.image === 'object' && p.image ? (p.image.url ?? null) : null,
  }));
}

interface CakeFormProps {
  /** Provide an existing cake to populate in edit mode */
  initialData?: CakeItem | null;
}

export function CakeForm({ initialData }: CakeFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [occasions, setOccasions] = useState<string[]>(initialData?.occasion_tags ?? []);
  const [startingPrice, setStartingPrice] = useState<string>(
    initialData?.starting_price ? String(initialData.starting_price) : ''
  );
  const [showPrice, setShowPrice] = useState(initialData?.show_price ?? true);
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [whatsappOverride, setWhatsappOverride] = useState(
    initialData?.whatsapp_message_override ?? ''
  );
  const [photos, setPhotos] = useState<PhotoSlot[]>(initPhotos(initialData));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function toggleOccasion(value: string) {
    setOccasions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function addPhotoSlot() {
    setPhotos((prev) => [...prev, { mediaId: null, previewUrl: null }]);
  }

  function removePhotoSlot(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function handlePhotoUploaded(index: number, mediaId: number) {
    setPhotos((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, mediaId } : slot))
    );
  }

  function handlePhotoClear(index: number) {
    setPhotos((prev) =>
      prev.map((slot, i) => (i === index ? { mediaId: null, previewUrl: null } : slot))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Cake name is required.');
      return;
    }

    const validPhotos = photos.filter((p) => p.mediaId !== null);
    if (validPhotos.length === 0) {
      setError('Please upload at least one photo.');
      return;
    }

    setSaving(true);

    try {
      const payload: Record<string, unknown> = {
        name: name.trim(),
        description: description.trim() || null,
        occasion_tags: occasions.length > 0 ? occasions : null,
        starting_price: startingPrice ? Number(startingPrice) : null,
        show_price: showPrice,
        featured,
        whatsapp_message_override: whatsappOverride.trim() || null,
        photos: validPhotos.map((p) => ({ image: p.mediaId })),
      };

      if (isEdit && initialData?.id) {
        await updateCake(initialData.id, payload);
      } else {
        await createCake(payload);
      }

      router.push('/studio/cakes');
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

      {/* Basic info */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Basic Info
        </h3>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Cake Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Strawberry Dream Cake"
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
            placeholder="Brief description of this cake…"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all resize-none"
          />
        </div>

        {/* Occasion tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Occasion Tags</label>
          <div className="flex flex-wrap gap-2">
            {OCCASION_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => toggleOccasion(opt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  occasions.includes(opt.value)
                    ? 'bg-brand-caramel text-white border-brand-caramel'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-caramel/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Pricing
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Starting Price (LKR)
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              placeholder="e.g. 6500"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all"
            />
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                  showPrice ? 'bg-brand-caramel' : 'bg-gray-200'
                }`}
                onClick={() => setShowPrice((v) => !v)}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    showPrice ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">Show price on site</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                  featured ? 'bg-amber-500' : 'bg-gray-200'
                }`}
                onClick={() => setFeatured((v) => !v)}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    featured ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={14} className={featured ? 'text-amber-500' : 'text-gray-400'} />
                <span className="text-sm font-medium text-gray-700">Featured cake</span>
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Photos <span className="text-red-500 font-bold">*</span>
          </h3>
          <button
            type="button"
            onClick={addPhotoSlot}
            className="flex items-center gap-1.5 text-brand-caramel text-xs font-medium hover:text-brand-caramelLight transition-colors"
          >
            <Plus size={14} />
            Add Photo
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {photos.map((slot, idx) => (
            <div key={idx} className="relative">
              <ImageUploader
                existingUrl={slot.previewUrl}
                onUploaded={(id) => handlePhotoUploaded(idx, id)}
                onClear={() => handlePhotoClear(idx)}
                label={`Photo ${idx + 1}`}
              />
              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhotoSlot(idx)}
                  className="absolute top-7 right-0 text-red-400 hover:text-red-600 transition-colors p-1"
                  title="Remove photo slot"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Advanced */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Advanced
        </h3>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            WhatsApp Message Override
          </label>
          <textarea
            value={whatsappOverride}
            onChange={(e) => setWhatsappOverride(e.target.value)}
            rows={3}
            placeholder="Leave blank to use the default message with the cake name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all resize-none"
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
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Cake'}
        </button>
      </div>
    </form>
  );
}
