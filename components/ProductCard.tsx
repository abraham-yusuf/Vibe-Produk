'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Product, Database } from '@/lib/types/database'
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi'

interface ProductCardProps {
  product: Product
  campaignSlug: string
}

// A/B Testing: Randomly select CTA text on component mount
function useRandomCTA(ctaA: string, ctaB: string) {
  const [cta, setCta] = useState(ctaA)

  useEffect(() => {
    setCta(Math.random() < 0.5 ? ctaA : ctaB)
  }, [ctaA, ctaB])

  return cta
}

export default function ProductCard({ product, campaignSlug }: ProductCardProps) {
  const supabase = createClient()
  const [isTracking, setIsTracking] = useState(false)

  // A/B Testing for CTA text
  const shopeeCTA = useRandomCTA(
    product.cta_text_a || 'Beli di Shopee',
    product.cta_text_b || 'Cek Promo'
  )

  const tiktokCTA = useRandomCTA(
    product.cta_text_a || 'Beli di TikTok',
    product.cta_text_b || 'Cek Promo'
  )

  const handleClick = async (platform: 'shopee' | 'tiktok') => {
    if (isTracking) return

    const affiliateUrl = platform === 'shopee' 
      ? product.affiliate_url_shopee 
      : product.affiliate_url_tiktok

    if (!affiliateUrl) return

    setIsTracking(true)

    try {
      // 1. Fire Pixel Events
      if (typeof window !== 'undefined') {
        // TikTok Pixel
        if (window.ttq) {
          window.ttq.track('ClickButton', {
            content_type: 'product',
            content_id: product.id,
            content_name: product.name,
            value: platform,
          })
        }

        // Meta Pixel
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: product.name,
            content_category: platform,
            value: 1.0,
            currency: 'IDR',
          })
        }

        // Google Tag Manager
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'product_click',
            product_id: product.id,
            product_name: product.name,
            platform: platform,
            campaign: campaignSlug,
          })
        }
      }

      // 2. Insert Click Record to Database
      const clickData = {
        product_id: product.id,
        platform: platform,
        visitor_source: typeof window !== 'undefined' ? document.referrer : null,
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
      }
      
      // @ts-ignore - Supabase type inference issue
      await supabase.from('clicks').insert([clickData])

      // 3. Construct URL with UTM Parameters
      const url = new URL(affiliateUrl)
      url.searchParams.append('utm_source', 'vibe_produk_id')
      url.searchParams.append('utm_campaign', campaignSlug)
      url.searchParams.append('utm_medium', platform)
      url.searchParams.append('utm_content', product.id)

      // 4. Redirect to Affiliate Link
      window.open(url.toString(), '_blank')
    } catch (error) {
      console.error('Tracking error:', error)
      // Still redirect even if tracking fails
      window.open(affiliateUrl, '_blank')
    } finally {
      setIsTracking(false)
    }
  }

  return (
    <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
      {/* Product Image */}
      {product.image_url && (
        <div className="relative w-full aspect-square overflow-hidden bg-white/5">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-vibe-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-vibe group-hover:bg-clip-text transition-all duration-300">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-400 text-sm mb-6 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3">
          {product.affiliate_url_shopee && (
            <button
              onClick={() => handleClick('shopee')}
              disabled={isTracking}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-400 active:scale-95 transition-all duration-200 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingBag className="w-5 h-5" />
              <span>{shopeeCTA}</span>
            </button>
          )}

          {product.affiliate_url_tiktok && (
            <button
              onClick={() => handleClick('tiktok')}
              disabled={isTracking}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-pink-400 active:scale-95 transition-all duration-200 shadow-lg shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span>{tiktokCTA}</span>
            </button>
          )}
        </div>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 -inset-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:inset-x-0 transition-all duration-1000 pointer-events-none" />
    </div>
  )
}

// TypeScript declarations for global tracking objects
declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, any>) => void
    }
    fbq?: (action: string, event: string, params?: Record<string, any>) => void
    dataLayer?: Array<Record<string, any>>
  }
}
