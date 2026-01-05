'use client'

import GlassCard from '@/components/ui/GlassCard'
import CampaignForm from '@/components/CampaignForm'

export default function CampaignModal() {
  const handleClose = () => {
    const modal = document.getElementById('campaign-modal')
    if (modal) {
      modal.classList.add('hidden')
    }
  }

  return (
    <div 
      id="campaign-modal" 
      className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Campaign</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <CampaignForm />
        </GlassCard>
      </div>
    </div>
  )
}