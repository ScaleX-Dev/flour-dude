import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { CakeForm } from '@/components/studio/CakeForm';

export default function NewCakePage() {
  return (
    <div className="max-w-2xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/studio/cakes" className="flex items-center gap-1 hover:text-gray-800 transition-colors">
          <ChevronLeft size={14} />
          Cakes
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">New Cake</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add New Cake</h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details and upload photos to publish a cake to your portfolio.
        </p>
      </div>

      <CakeForm />
    </div>
  );
}
