'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Cake,
  Tag,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChefHat,
} from 'lucide-react';
import { logoutUser } from '@/lib/studio-api';

const navItems = [
  {
    href: '/studio',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/studio/cakes',
    label: 'Cakes',
    icon: Cake,
  },
  {
    href: '/studio/banners',
    label: 'Seasonal Banners',
    icon: Tag,
  },
];

function NavLink({
  item,
  onClick,
}: {
  item: (typeof navItems)[number];
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = item.exact
    ? pathname === item.href
    : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active
          ? 'bg-brand-caramel text-white shadow-sm'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <item.icon size={18} strokeWidth={2} />
      {item.label}
    </Link>
  );
}

export function StudioNav({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close drawer on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await logoutUser().catch(() => {});
    router.push('/studio/login');
  }

  const sidebar = (
    <div className="flex flex-col h-full bg-brand-deepBrown">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-brand-caramel flex items-center justify-center flex-shrink-0">
          <ChefHat size={20} className="text-white" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Flour Dude</p>
          <p className="text-white/50 text-xs">Studio Admin</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-white/30 text-[11px] font-semibold uppercase tracking-widest px-4 mb-2">
          Content
        </p>
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} onClick={() => setMobileOpen(false)} />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <LogOut size={18} strokeWidth={2} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-60 flex-shrink-0 fixed inset-y-0 left-0 z-30">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col lg:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X size={20} />
        </button>
        {sidebar}
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-caramel flex items-center justify-center">
              <ChefHat size={15} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">Flour Dude Studio</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
