'use client';

import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCake, getCurrentUser, type CakeItem } from '@/lib/studio-api';
import { CakeForm } from '@/components/studio/CakeForm';

export default function EditCakePage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [cake, setCake] = useState<CakeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/studio/login');
        return;
      }

      try {
        const data = await getCake(id);
        setCake(data);
      } catch {
        setError('Could not load cake. It may have been deleted.');
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id, router]);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/studio/cakes"
          className="flex items-center gap-1 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={14} />
          Cakes
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">
          {cake ? cake.name : 'Edit'}
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit Cake</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update the details and photos for this cake.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={28} className="text-brand-caramel animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-8 text-center">
          <p className="text-red-700 font-medium">{error}</p>
          <Link
            href="/studio/cakes"
            className="mt-4 inline-block text-sm text-brand-caramel underline underline-offset-4"
          >
            Back to Cakes
          </Link>
        </div>
      ) : (
        <CakeForm initialData={cake} />
      )}
    </div>
  );
}
