import React from 'react';
import { getDashboardStats } from '../actions';
import DashboardChart from '@/components/DashboardChart';
import Sidebar from '@/components/Sidebar';
import GlassCard from '@/components/GlassCard';
import { FiMousePointer, FiTrendingUp } from 'react-icons/fi';

export default async function DashboardPage() {
  const { totalClicks, bestPlatform, weeklyClicks } = await getDashboardStats();

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Overview of your affiliate performance.</p>
          </header>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="flex items-center gap-4">
              <div className="p-4 bg-purple-600/20 rounded-xl text-purple-500">
                <FiMousePointer size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Clicks</p>
                <h3 className="text-2xl font-bold text-white">{totalClicks}</h3>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4">
              <div className="p-4 bg-pink-600/20 rounded-xl text-pink-500">
                <FiTrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Best Platform</p>
                <h3 className="text-2xl font-bold text-white capitalize">{bestPlatform}</h3>
              </div>
            </GlassCard>

             <GlassCard className="flex items-center gap-4 bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30">
              <div className="p-4 bg-white/10 rounded-xl text-white">
                <span className="font-bold text-lg">🚀</span>
              </div>
               <div>
                <p className="text-sm text-gray-300">Viral Status</p>
                <h3 className="text-lg font-bold text-white">Active</h3>
              </div>
            </GlassCard>
          </div>

          {/* Charts */}
          <DashboardChart data={weeklyClicks} />
        </div>
      </main>
    </div>
  );
}
