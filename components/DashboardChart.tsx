'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import type { WeeklyClick } from '@/lib/types/database';

export default function DashboardChart({ data }: { data: WeeklyClick[] }) {
  if (!data || data.length === 0) {
     return (
        <GlassCard className="h-96 flex items-center justify-center text-gray-500">
            No data available for the last 7 days.
        </GlassCard>
     )
  }

  // Format date for display
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.click_date).toLocaleDateString('en-US', { weekday: 'short' }),
  }));

  return (
    <GlassCard className="h-96 w-full">
      <h3 className="text-xl font-bold text-white mb-6">Weekly Clicks</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{
                backgroundColor: '#1f1f23',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
            }}
          />
          <Bar
            dataKey="total_clicks"
            fill="#9333ea"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
