'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiBox, FiLogOut } from 'react-icons/fi';
import GlassCard from '@/components/GlassCard';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Products', href: '/products', icon: FiBox },
  ];

  return (
    <GlassCard className="h-screen w-64 rounded-none border-l-0 border-y-0 fixed left-0 top-0 flex flex-col">
      <div className="p-4 mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Vibe Produk
        </h1>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors w-full">
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </GlassCard>
  );
}
