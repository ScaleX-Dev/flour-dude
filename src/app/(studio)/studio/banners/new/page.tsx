import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { BannerForm } from '@/components/studio/BannerForm';

export default function NewBannerPage() {
  return (
    <div className="max-w-2xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/studio/banners"
          className="flex items-center gap-1 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={14} />
          Banners
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">New Banner</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add Seasonal Banner</h1>
        <p className="text-gray-500 text-sm mt-1">
          Create a promotional banner for seasonal offers, holidays, or special events.
        </p>
      </div>

      <BannerForm />
    </div>
  );
}
