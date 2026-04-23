'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  ImageOff,
  Clock,
  Tag,
} from 'lucide-react';
import { getCurrentUser, listBanners, deleteBanner, type BannerItem } from '@/lib/studio-api';

const BANNER_TYPE_LABELS: Record<string, string> = {
  seasonal: 'Seasonal Offer',
  homepage: 'Homepage',
  menu: 'Menu',
  global: 'Global',
};

const BANNER_TYPE_COLORS: Record<string, string> = {
  seasonal: 'bg-orange-50 text-orange-600',
  homepage: 'bg-blue-50 text-blue-600',
  menu: 'bg-purple-50 text-purple-600',
  global: 'bg-gray-100 text-gray-600',
};

function BannerRow({ banner, onDelete }: { banner: BannerItem; onDelete: (id: number) => void }) {
  const [deleting, setDeleting] = useState(false);

  const imageUrl =
    typeof banner.image === 'object' && banner.image ? banner.image.url : null;

  const isExpired =
    banner.expires_at && new Date(banner.expires_at) < new Date();

  async function handleDelete() {
    if (!confirm(`Delete banner "${banner.headline}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteBanner(banner.id);
      onDelete(banner.id);
    } catch {
      alert('Failed to delete banner. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-0">
        {/* Thumbnail */}
        <div className="relative w-24 sm:w-36 flex-shrink-0 bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={banner.headline ?? 'Banner'}
              fill
              sizes="144px"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[80px] text-gray-300">
              <ImageOff size={20} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {banner.banner_type && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    BANNER_TYPE_COLORS[banner.banner_type] ?? 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Tag size={8} className="inline mr-0.5" />
                  {BANNER_TYPE_LABELS[banner.banner_type] ?? banner.banner_type}
                </span>
              )}

              {banner.active ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={9} />
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                  <XCircle size={9} />
                  Inactive
                </span>
              )}

              {isExpired && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                  <Clock size={9} />
                  Expired
                </span>
              )}
            </div>

            <p className="font-semibold text-gray-900 text-sm truncate">{banner.headline}</p>
            {banner.sub_headline && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">{banner.sub_headline}</p>
            )}
            {banner.expires_at && (
              <p className="text-xs text-gray-400 mt-1">
                Expires {new Date(banner.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <Link
              href={`/studio/banners/${banner.id}`}
              className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg py-1.5 px-3 text-xs font-medium transition-colors"
            >
              <Pencil size={11} />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg py-1.5 px-3 text-xs font-medium transition-colors disabled:opacity-50"
            >
              {deleting ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudioBannersPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/studio/login');
        return;
      }
      const res = await listBanners(1, 100).catch(() => null);
      setBanners(res?.docs ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  function handleDelete(id: number) {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  }

  const seasonal = banners.filter((b) => b.banner_type === 'seasonal');
  const other = banners.filter((b) => b.banner_type !== 'seasonal');

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Seasonal Banners</h1>
          <p className="text-gray-500 text-sm mt-1">
            {banners.filter((b) => b.active).length} active ·{' '}
            {banners.length} total
          </p>
        </div>
        <Link
          href="/studio/banners/new"
          className="inline-flex items-center gap-2 bg-brand-caramel hover:bg-brand-caramelLight text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus size={16} />
          Add Banner
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-brand-caramel border-t-transparent rounded-full animate-spin" />
        </div>
      ) : banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-200 gap-4">
          <p className="text-gray-500 text-sm">No banners yet.</p>
          <Link
            href="/studio/banners/new"
            className="inline-flex items-center gap-2 bg-brand-caramel text-white font-medium px-5 py-2.5 rounded-xl text-sm"
          >
            <Plus size={15} />
            Add your first banner
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Seasonal section */}
          {seasonal.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Seasonal Offers</span>
                <span className="text-xs bg-orange-100 text-orange-600 font-medium px-2 py-0.5 rounded-full">
                  {seasonal.length}
                </span>
              </div>
              <div className="space-y-3">
                {seasonal.map((banner) => (
                  <BannerRow key={banner.id} banner={banner} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}

          {/* Other banners */}
          {other.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Other Banners</span>
                <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">
                  {other.length}
                </span>
              </div>
              <div className="space-y-3">
                {other.map((banner) => (
                  <BannerRow key={banner.id} banner={banner} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
