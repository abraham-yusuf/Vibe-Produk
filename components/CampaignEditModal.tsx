'use client'

import { useEffect } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import CampaignForm from '@/components/CampaignForm'
import type { Campaign } from '@/lib/types/database'

interface CampaignEditModalProps {
  campaign: Campaign
  onClose: () => void
}

export default function CampaignEditModal({ campaign, onClose }: CampaignEditModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Edit Campaign</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <CampaignForm campaign={campaign} onSuccess={onClose} />
        </GlassCard>
      </div>
    </div>
  )
}