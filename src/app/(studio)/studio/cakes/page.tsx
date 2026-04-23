'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Loader2,
  ImageOff,
  Search,
} from 'lucide-react';
import { getCurrentUser, listCakes, deleteCake, type CakeItem } from '@/lib/studio-api';

function CakeCard({ cake, onDelete }: { cake: CakeItem; onDelete: (id: number) => void }) {
  const [deleting, setDeleting] = useState(false);

  const firstPhoto = cake.photos?.[0];
  const imageUrl =
    typeof firstPhoto?.image === 'object' && firstPhoto.image
      ? firstPhoto.image.url
      : null;

  async function handleDelete() {
    if (!confirm(`Delete "${cake.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteCake(cake.id);
      onDelete(cake.id);
    } catch {
      alert('Failed to delete cake. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  const occasionLabels: Record<string, string> = {
    birthdays: 'Birthdays',
    weddings: 'Weddings',
    corporate: 'Corporate',
    kids: 'Kids',
    novelty: 'Novelty',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={cake.name ?? 'Cake'}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300">
            <ImageOff size={32} />
          </div>
        )}
        {cake.featured && (
          <span className="absolute top-2 left-2 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star size={9} fill="white" />
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-semibold text-gray-900 text-sm truncate">{cake.name}</p>

        {/* Occasion tags */}
        {cake.occasion_tags?.length ? (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {cake.occasion_tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full"
              >
                {occasionLabels[tag] ?? tag}
              </span>
            ))}
          </div>
        ) : null}

        {cake.starting_price && cake.show_price ? (
          <p className="text-xs text-gray-500 mt-1.5">
            From LKR {cake.starting_price.toLocaleString()}
          </p>
        ) : null}

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Link
            href={`/studio/cakes/${cake.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl py-2 text-xs font-medium transition-colors"
          >
            <Pencil size={12} />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl py-2 px-3 text-xs font-medium transition-colors disabled:opacity-50"
          >
            {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudioCakesPage() {
  const router = useRouter();
  const [cakes, setCakes] = useState<CakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/studio/login');
        return;
      }
      const res = await listCakes(1, 200).catch(() => null);
      setCakes(res?.docs ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  function handleDelete(id: number) {
    setCakes((prev) => prev.filter((c) => c.id !== id));
  }

  const filtered = cakes.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Cakes</h1>
          <p className="text-gray-500 text-sm mt-1">
            {cakes.length} cake{cakes.length !== 1 ? 's' : ''} in your portfolio
          </p>
        </div>
        <Link
          href="/studio/cakes/new"
          className="inline-flex items-center gap-2 bg-brand-caramel hover:bg-brand-caramelLight text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus size={16} />
          Add Cake
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cakes…"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-caramel/30 focus:border-brand-caramel transition-all"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-brand-caramel border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-200 gap-4">
          {search ? (
            <p className="text-gray-500 text-sm">No cakes match &ldquo;{search}&rdquo;</p>
          ) : (
            <>
              <p className="text-gray-500 text-sm">No cakes yet.</p>
              <Link
                href="/studio/cakes/new"
                className="inline-flex items-center gap-2 bg-brand-caramel text-white font-medium px-5 py-2.5 rounded-xl text-sm"
              >
                <Plus size={15} />
                Add your first cake
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((cake) => (
            <CakeCard key={cake.id} cake={cake} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
