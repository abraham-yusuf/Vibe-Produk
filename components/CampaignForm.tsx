'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Campaign } from '@/lib/types/database'
import { FiLink, FiType, FiCode } from 'react-icons/fi'

interface CampaignFormProps {
  campaign?: Campaign
  onSuccess?: () => void
}

export default function CampaignForm({ campaign, onSuccess }: CampaignFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    slug: campaign?.slug || '',
    title: campaign?.title || '',
    pixel_tiktok: campaign?.pixel_tiktok || '',
    pixel_meta: campaign?.pixel_meta || '',
    gtm_id: campaign?.gtm_id || '',
  })

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  useEffect(() => {
    if (!campaign && formData.title && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title)
      }))
    }
  }, [formData.title, campaign, formData.slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'slug') {
      // Clean slug input
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9-]/g, '')
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(formData.slug)) {
        throw new Error('Slug can only contain lowercase letters, numbers, and hyphens')
      }

      if (campaign) {
        // Update existing campaign
        const { error: updateError } = await supabase
          .from('campaigns')
          .update({
            slug: formData.slug,
            title: formData.title,
            pixel_tiktok: formData.pixel_tiktok || null,
            pixel_meta: formData.pixel_meta || null,
            gtm_id: formData.gtm_id || null,
          })
          .eq('id', campaign.id)

        if (updateError) throw updateError
      } else {
        // Create new campaign
        const { error: insertError } = await supabase
          .from('campaigns')
          .insert([{
            slug: formData.slug,
            title: formData.title,
            pixel_tiktok: formData.pixel_tiktok || null,
            pixel_meta: formData.pixel_meta || null,
            gtm_id: formData.gtm_id || null,
          }])

        if (insertError) throw insertError
      }

      // Success callback
      if (onSuccess) {
        onSuccess()
      } else {
        // Close modal and refresh if no callback
        const modal = document.getElementById('campaign-modal')
        if (modal) modal.classList.add('hidden')
      }
      
      router.refresh()
      
      // Reset form if creating new
      if (!campaign) {
        setFormData({
          slug: '',
          title: '',
          pixel_tiktok: '',
          pixel_meta: '',
          gtm_id: '',
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Campaign Title *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiType className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            placeholder="Skincare Viral 2024"
          />
        </div>
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          URL Slug *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiLink className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            placeholder="skincare-viral-2024"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Your page will be accessible at: <span className="text-purple-400">/{formData.slug || 'your-slug'}</span>
        </p>
      </div>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-vibe-dark text-sm text-gray-500">Tracking Pixels (Optional)</span>
        </div>
      </div>

      {/* TikTok Pixel */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          TikTok Pixel ID
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiCode className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="pixel_tiktok"
            value={formData.pixel_tiktok}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            placeholder="C9XXXXXXXXXXXXXXXXX"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Find this in TikTok Events Manager
        </p>
      </div>

      {/* Meta Pixel */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Meta (Facebook) Pixel ID
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiCode className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="pixel_meta"
            value={formData.pixel_meta}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            placeholder="123456789012345"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Find this in Meta Events Manager
        </p>
      </div>

      {/* GTM ID */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Google Tag Manager ID
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiCode className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="gtm_id"
            value={formData.gtm_id}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            placeholder="GTM-XXXXXXX"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Find this in Google Tag Manager
        </p>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-blue-400 mb-2 font-medium">💡 Pro Tip</p>
        <p className="text-xs text-gray-400">
          Add tracking pixels to monitor conversions and optimize your campaigns. You can always add them later from the edit page.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            const modal = document.getElementById('campaign-modal')
            if (modal) modal.classList.add('hidden')
          }}
          className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-4 bg-gradient-vibe text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : campaign ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </div>
    </form>
  )
}