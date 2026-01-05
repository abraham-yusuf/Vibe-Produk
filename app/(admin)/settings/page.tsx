import { createServerSupabaseClient } from '@/lib/supabase/server'
import GlassCard from '@/components/ui/GlassCard'

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences.</p>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <p className="text-white">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">User ID</label>
            <p className="text-white font-mono text-sm">{user?.id}</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Coming Soon</h2>
        <p className="text-gray-400">More settings will be available here soon.</p>
      </GlassCard>
    </div>
  )
            }
