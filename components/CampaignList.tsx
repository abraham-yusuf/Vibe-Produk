'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FiEdit2, FiTrash2, FiExternalLink, FiCopy, FiCheckCircle } from 'react-icons/fi'
import CampaignEditModal from '@/components/CampaignEditModal'
import type { Campaign } from '@/lib/types/database'

interface CampaignWithProducts extends Campaign {
  products?: { count: number }[]
}

interface CampaignListProps {
  campaigns: CampaignWithProducts[]
}

export default function CampaignList({ campaigns }: CampaignListProps) {
  const router = useRouter()
  const supabase = createClient()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign? All associated products will also be deleted.')) {
      return
    }

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id)

      if (error) throw error
      router.refresh()
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete campaign')
    } finally {
      setDeletingId(null)
    }
  }

  const handleCopyUrl = async (slug: string) => {
    try {
      const url = `${window.location.origin}/${slug}`
      await navigator.clipboard.writeText(url)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    } catch (err) {
      console.error('Copy error:', err)
    }
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <p className="text-gray-400 mb-4">No campaigns yet. Create your first campaign to get started!</p>
        <button
          onClick={() => {
            const modal = document.getElementById('campaign-modal')
            if (modal) modal.classList.remove('hidden')
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-vibe text-white font-bold rounded-lg hover:opacity-90 transition-all duration-200"
        >
          Create Campaign
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => {
          const productCount = campaign.products?.[0]?.count || 0
          const hasTracking = !!(campaign.pixel_tiktok || campaign.pixel_meta || campaign.gtm_id)
          const trackingCount = [campaign.pixel_tiktok, campaign.pixel_meta, campaign.gtm_id].filter(Boolean).length

          return (
            <div
              key={campaign.id}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Campaign Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{campaign.title}</h3>
                    {hasTracking && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                        {trackingCount} Pixel{trackingCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* URL */}
                  <div className="flex items-center gap-2 mb-4">
                    <code className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded">
                      /{campaign.slug}
                    </code>
                    <button
                      onClick={() => handleCopyUrl(campaign.slug)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      title="Copy URL"
                    >
                      {copiedSlug === campaign.slug ? (
                        <FiCheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <FiCopy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={`/${campaign.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      title="Open page"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Products: </span>
                      <span className="text-white font-medium">{productCount}</span>
                    </div>
                    {campaign.pixel_tiktok && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full" />
                        <span className="text-gray-400">TikTok</span>
                      </div>
                    )}
                    {campaign.pixel_meta && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-gray-400">Meta</span>
                      </div>
                    )}
                    {campaign.gtm_id && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full" />
                        <span className="text-gray-400">GTM</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingCampaign(campaign)}
                    className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    disabled={deletingId === campaign.id}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Modal */}
      {editingCampaign && (
        <CampaignEditModal
          campaign={editingCampaign}
          onClose={() => setEditingCampaign(null)}
        />
      )}
    </>
  )
}