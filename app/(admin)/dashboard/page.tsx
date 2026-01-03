import { createServerSupabaseClient } from '@/lib/supabase/server'
import GlassCard from '@/components/ui/GlassCard'
import { FiTrendingUp, FiShoppingBag, FiShoppingCart, FiEye } from 'react-icons/fi'
import WeeklyClicksChart from '@/components/WeeklyClicksChart'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch total clicks
  const { count: totalClicks } = await supabase
    .from('clicks')
    .select('*', { count: 'exact', head: true })

  // Fetch clicks by platform
  const { data: shopeeClicks } = await supabase
    .from('clicks')
    .select('id', { count: 'exact', head: true })
    .eq('platform', 'shopee')

  const { data: tiktokClicks } = await supabase
    .from('clicks')
    .select('id', { count: 'exact', head: true })
    .eq('platform', 'tiktok')

  // Fetch active products count
  const { count: activeProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // Fetch weekly clicks data for chart
  const { data: weeklyData } = await supabase.rpc('get_weekly_clicks')

  // Calculate best platform
  const shopeeCount = shopeeClicks || 0
  const tiktokCount = tiktokClicks || 0
  const bestPlatform = shopeeCount > tiktokCount ? 'Shopee' : 'TikTok'
  const bestPlatformPercentage = totalClicks 
    ? Math.round((Math.max(shopeeCount, tiktokCount) / totalClicks) * 100)
    : 0

  const stats = [
    {
      label: 'Total Clicks',
      value: totalClicks?.toLocaleString() || '0',
      icon: FiTrendingUp,
      color: 'purple',
      trend: '+12%',
    },
    {
      label: 'Shopee Clicks',
      value: shopeeCount.toLocaleString(),
      icon: FiShoppingBag,
      color: 'orange',
      trend: `${Math.round((shopeeCount / (totalClicks || 1)) * 100)}%`,
    },
    {
      label: 'TikTok Clicks',
      value: tiktokCount.toLocaleString(),
      icon: FiShoppingCart,
      color: 'pink',
      trend: `${Math.round((tiktokCount / (totalClicks || 1)) * 100)}%`,
    },
    {
      label: 'Active Products',
      value: activeProducts?.toLocaleString() || '0',
      icon: FiEye,
      color: 'blue',
      trend: 'Live',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your performance overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            purple: 'bg-purple-500/20 text-purple-400',
            orange: 'bg-orange-500/20 text-orange-400',
            pink: 'bg-pink-500/20 text-pink-400',
            blue: 'bg-blue-500/20 text-blue-400',
          }
          
          return (
            <GlassCard key={index} hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </GlassCard>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Clicks Chart */}
        <GlassCard className="p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6">Weekly Activity</h2>
          <WeeklyClicksChart data={weeklyData || []} />
        </GlassCard>

        {/* Best Platform Card */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Best Platform</h2>
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-vibe flex items-center justify-center animate-pulse-slow">
                <span className="text-4xl font-bold text-white">{bestPlatformPercentage}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-1">{bestPlatform}</p>
              <p className="text-gray-400 text-sm">Leading platform this week</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/products"
            className="p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/20 rounded-lg transition-all duration-200 group"
          >
            <p className="font-semibold text-white mb-1 group-hover:text-purple-400">Add New Product</p>
            <p className="text-sm text-gray-400">Create a new affiliate product</p>
          </a>
          <a
            href="/campaigns"
            className="p-4 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/20 rounded-lg transition-all duration-200 group"
          >
            <p className="font-semibold text-white mb-1 group-hover:text-pink-400">View Campaigns</p>
            <p className="text-sm text-gray-400">Manage your bio link pages</p>
          </a>
          <a
            href="/analytics"
            className="p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 rounded-lg transition-all duration-200 group"
          >
            <p className="font-semibold text-white mb-1 group-hover:text-blue-400">Deep Analytics</p>
            <p className="text-sm text-gray-400">View detailed insights</p>
          </a>
        </div>
      </GlassCard>
    </div>
  )
                }
