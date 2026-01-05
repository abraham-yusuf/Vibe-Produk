import { createServerSupabaseClient } from '@/lib/supabase/server'
import GlassCard from '@/components/ui/GlassCard'
import CampaignList from '@/components/CampaignList'
import NewCampaignButton from '@/components/NewCampaignButton'
import CampaignModal from '@/components/CampaignModal'

export const dynamic = 'force-dynamic'

interface CampaignWithProductCount {
  id: string
  user_id: string | null
  slug: string
  title: string
  pixel_tiktok: string | null
  pixel_meta: string | null
  gtm_id: string | null
  created_at: string
  products?: { count: number }[]
}

export default async function CampaignsPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch all campaigns with product count
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select(`
      *,
      products (count)
    `)
    .order('created_at', { ascending: false }) as { data: CampaignWithProductCount[] | null }

  // Calculate stats
  const totalCampaigns = campaigns?.length || 0
  const totalProducts = campaigns?.reduce((acc, c) => {
    const count = c.products?.[0]?.count || 0
    return acc + count
  }, 0) || 0
  const campaignsWithTracking = campaigns?.filter(c => 
    c.pixel_tiktok || c.pixel_meta || c.gtm_id
  ).length || 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Campaigns</h1>
          <p className="text-gray-400">Manage your bio link pages and tracking pixels.</p>
        </div>
        <NewCampaignButton />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-1">Total Campaigns</p>
          <p className="text-3xl font-bold text-white">{totalCampaigns}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-1">Active Products</p>
          <p className="text-3xl font-bold text-white">{totalProducts}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-1">With Tracking</p>
          <p className="text-3xl font-bold text-white">{campaignsWithTracking}</p>
        </GlassCard>
      </div>

      {/* Campaigns List */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">All Campaigns</h2>
        <CampaignList campaigns={campaigns || []} />
      </GlassCard>

      {/* Campaign Form Modal */}
      <CampaignModal />
    </div>
  )
}