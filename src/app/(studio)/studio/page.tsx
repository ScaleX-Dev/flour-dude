'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cake, Tag, Plus, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { getCurrentUser, listCakes, listBanners } from '@/lib/studio-api';

interface Stats {
  totalCakes: number;
  featuredCakes: number;
  totalBanners: number;
  activeBanners: number;
}

export default function StudioDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/studio/login');
        return;
      }

      const [cakesRes, bannersRes] = await Promise.all([
        listCakes(1, 200).catch(() => null),
        listBanners(1, 200).catch(() => null),
      ]);

      setStats({
        totalCakes: cakesRes?.totalDocs ?? 0,
        featuredCakes: cakesRes?.docs.filter((c) => c.featured).length ?? 0,
        totalBanners: bannersRes?.totalDocs ?? 0,
        activeBanners: bannersRes?.docs.filter((b) => b.active).length ?? 0,
      });

      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-caramel border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Cakes',
      value: stats?.totalCakes ?? 0,
      sub: `${stats?.featuredCakes ?? 0} featured`,
      icon: Cake,
      color: 'bg-amber-50 text-amber-600',
      href: '/studio/cakes',
    },
    {
      label: 'Featured Cakes',
      value: stats?.featuredCakes ?? 0,
      sub: 'Shown first in gallery',
      icon: TrendingUp,
      color: 'bg-orange-50 text-orange-600',
      href: '/studio/cakes',
    },
    {
      label: 'Seasonal Banners',
      value: stats?.totalBanners ?? 0,
      sub: `${stats?.activeBanners ?? 0} active`,
      icon: Tag,
      color: 'bg-green-50 text-green-600',
      href: '/studio/banners',
    },
    {
      label: 'Active Banners',
      value: stats?.activeBanners ?? 0,
      sub: 'Visible to visitors',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
      href: '/studio/banners',
    },
  ];

  return (
    <div className="max-w-6xl space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your cake portfolio and seasonal banners.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 tabular-nums">{card.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/studio/cakes/new"
            className="flex items-center gap-4 bg-white border-2 border-dashed border-brand-caramel/40 hover:border-brand-caramel hover:bg-amber-50/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-caramel/10 group-hover:bg-brand-caramel/20 flex items-center justify-center transition-colors flex-shrink-0">
              <Plus size={22} className="text-brand-caramel" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Add New Cake</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Upload photos, set occasion tags, and publish
              </p>
            </div>
          </Link>

          <Link
            href="/studio/banners/new"
            className="flex items-center gap-4 bg-white border-2 border-dashed border-green-400/40 hover:border-green-500 hover:bg-green-50/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center transition-colors flex-shrink-0">
              <Plus size={22} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Add Seasonal Banner</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Create a promotional banner for special offers
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recently updated notice */}
      <div className="bg-brand-deepBrown/5 border border-brand-deepBrown/10 rounded-2xl px-5 py-4 flex items-start gap-3">
        <Clock size={18} className="text-brand-caramel mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-gray-800">Cake page updates are near-instant</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Changes published here reflect on the public site within 60 seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
