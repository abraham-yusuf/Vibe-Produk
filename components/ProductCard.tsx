'use client';

import React, { useEffect, useState } from 'react';
import { recordClick } from '@/app/(admin)/actions';
import { Product } from '@/types';
import GlassCard from './GlassCard';
import ViralButton from './ViralButton';
import { SiTiktok, SiShopee } from 'react-icons/si';

interface ProductCardProps {
  product: Product;
  pixel_tiktok?: string;
  pixel_meta?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ttq?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: any;
  }
}

export default function ProductCard({ product, pixel_tiktok, pixel_meta }: ProductCardProps) {
  const [ctaText, setCtaText] = useState(product.cta_text_a || 'Beli di Shopee');

  // A/B Testing Logic: Randomly select between cta_text_a and cta_text_b on mount
  useEffect(() => {
    // We put this in a timeout to avoid the synchronous setState warning, although purely client-side logic is fine.
    // Or simply disable the rule line if we are sure.
    // But let's use a cleaner check.
    if (product.cta_text_a && product.cta_text_b) {
       const randomText = Math.random() > 0.5 ? product.cta_text_a : product.cta_text_b;
       setCtaText(randomText);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleClick = async (platform: 'shopee' | 'tiktok') => {
    const url = platform === 'shopee' ? product.affiliate_url_shopee : product.affiliate_url_tiktok;
    if (!url) return;

    // Fire Pixels
    if (pixel_tiktok && window.ttq) {
      window.ttq.track('ClickButton', {
        content_id: product.id,
        content_name: product.name,
        content_type: 'product',
      });
    }

    if (pixel_meta && window.fbq) {
      window.fbq('track', 'OutboundClick', {
        content_name: product.name,
        content_category: platform,
      });
    }

    // Record Click in DB (Fire and forget)
    recordClick(product.id, platform, navigator.userAgent, document.referrer);

    // Construct URL with UTM params
    const finalUrl = new URL(url);
    finalUrl.searchParams.set('utm_source', 'vibe_produk_id');

    // Redirect
    window.open(finalUrl.toString(), '_blank');
  };

  return (
    <GlassCard className="flex flex-col h-full hover:bg-white/10 transition-colors duration-300">
      <div className="aspect-square w-full bg-white/5 rounded-xl mb-4 overflow-hidden relative">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
      <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-1">{product.description}</p>

      <div className="space-y-3">
        {product.affiliate_url_shopee && (
          <ViralButton
            fullWidth
            onClick={() => handleClick('shopee')}
            className="bg-orange-500 hover:bg-orange-600 border-none"
          >
            <SiShopee className="text-xl" />
            <span>{ctaText}</span>
          </ViralButton>
        )}

        {product.affiliate_url_tiktok && (
          <ViralButton
            fullWidth
            variant="secondary"
            onClick={() => handleClick('tiktok')}
            className="bg-black hover:bg-gray-900 border border-white/10"
          >
            <SiTiktok className="text-xl" />
            <span>Beli di TikTok</span>
          </ViralButton>
        )}
      </div>
    </GlassCard>
  );
}
