import { createServerSupabaseClient } from '@/lib/supabase/server'
import GlassCard from '@/components/ui/GlassCard'
import CampaignForm from '@/components/CampaignForm'
import CampaignList from '@/components/CampaignList'
import { FiPlus } from 'react-icons/fi'

export const dynamic = 'force-dynamic'

export default async function CampaignsPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch all campaigns with product count
  // @ts-ignore - Supabase type inference limitation with count aggregates
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select(`
      *,
      products (count)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Campaigns</h1>
          <p className="text-gray-400">Manage your bio link pages and tracking pixels.</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-gradient-vibe text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 shadow-xl shadow-purple-500/20"
          onClick={() => {
            const modal = document.getElementById('campaign-modal')
            if (modal) modal.classList.remove('hidden')
          }}
        >
          <FiPlus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-1">Total Campaigns</p>
          <p className="text-3xl font-bold text-white">{campaigns?.length || 0}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-1">Active Products</p>
          <p className="text-3xl font-bold text-white">
            {/* @ts-expect-error - Supabase type inference limitation with count aggregates */}
            {campaigns?.reduce((acc, c) => acc + (c.products?.[0]?.count || 0), 0) || 0}
          </p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-1">With Tracking</p>
          <p className="text-3xl font-bold text-white">
            {/* @ts-expect-error - Supabase type inference limitation with count aggregates */}
            {campaigns?.filter(c => c.pixel_tiktok || c.pixel_meta || c.gtm_id).length || 0}
          </p>
        </GlassCard>
      </div>

      {/* Campaigns List */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">All Campaigns</h2>
        <CampaignList campaigns={campaigns || []} />
      </GlassCard>

      {/* Campaign Form Modal */}
      <div id="campaign-modal" className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create New Campaign</h2>
              <button
                onClick={() => {
                  const modal = document.getElementById('campaign-modal')
                  if (modal) modal.classList.add('hidden')
                }}
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
    </div>
  )
}