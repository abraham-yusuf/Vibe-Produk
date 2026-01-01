'use client';

import React from 'react';
import { deleteProduct } from '@/app/(admin)/actions';
import { FiTrash2 } from 'react-icons/fi';
import GlassCard from '@/components/GlassCard';
import { Product } from '@/types';

export default function ProductList({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No products found. Add one above!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <GlassCard key={product.id} className="relative group overflow-hidden">
          <div className="aspect-square w-full bg-white/5 rounded-lg mb-4 overflow-hidden relative">
            {product.image_url ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img
                 src={product.image_url}
                 alt={product.name}
                 className="w-full h-full object-cover transition-transform group-hover:scale-105"
               />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-white truncate">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.campaigns?.title || 'No Campaign'}</p>
            </div>
            <button
              onClick={() => deleteProduct(product.id)}
              className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            >
              <FiTrash2 />
            </button>
          </div>

          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex gap-2">
            {product.affiliate_url_shopee && (
              <a href={product.affiliate_url_shopee} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-orange-500/20 text-orange-500 rounded-lg text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors">
                Shopee
              </a>
            )}
            {product.affiliate_url_tiktok && (
               <a href={product.affiliate_url_tiktok} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-black/40 text-white border border-white/10 rounded-lg text-xs font-bold hover:bg-black transition-colors">
                TikTok
              </a>
            )}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
