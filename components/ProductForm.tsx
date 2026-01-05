'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Campaign, Database } from '@/lib/types/database'

interface ProductFormProps {
  campaigns: Pick<Campaign, 'id' | 'slug' | 'title'>[]
}

export default function ProductForm({ campaigns }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    campaign_id: campaigns[0]?.id || '',
    affiliate_url_shopee: '',
    affiliate_url_tiktok: '',
    cta_text_a: 'Beli di Shopee',
    cta_text_b: 'Cek Promo',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const productData = {
        ...formData,
        is_active: true,
      }
      
      const { error: insertError } = await supabase
        .from('products')
        // @ts-ignore - Supabase type inference issue
        .insert([productData])

      if (insertError) throw insertError

      // Reset form
      setFormData({
        name: '',
        description: '',
        image_url: '',
        campaign_id: campaigns[0]?.id || '',
        affiliate_url_shopee: '',
        affiliate_url_tiktok: '',
        cta_text_a: 'Beli di Shopee',
        cta_text_b: 'Cek Promo',
      })

      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Serum Glow Viral"
          />
        </div>

        {/* Campaign */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Campaign *
          </label>
          <select
            name="campaign_id"
            value={formData.campaign_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id} className="bg-vibe-darker">
                {campaign.title} ({campaign.slug})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          placeholder="Serum wajah yang lagi viral di TikTok..."
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Image URL
        </label>
        <input
          type="url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Affiliate URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Shopee Affiliate URL
          </label>
          <input
            type="url"
            name="affiliate_url_shopee"
            value={formData.affiliate_url_shopee}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="https://shopee.co.id/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            TikTok Affiliate URL
          </label>
          <input
            type="url"
            name="affiliate_url_tiktok"
            value={formData.affiliate_url_tiktok}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="https://vt.tiktok.com/..."
          />
        </div>
      </div>

      {/* CTA Texts for A/B Testing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CTA Text A (for A/B Test)
          </label>
          <input
            type="text"
            name="cta_text_a"
            value={formData.cta_text_a}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Beli di Shopee"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CTA Text B (for A/B Test)
          </label>
          <input
            type="text"
            name="cta_text_b"
            value={formData.cta_text_b}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Cek Promo"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-gradient-vibe text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  )
}
