'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { WeeklyClick } from '@/lib/types/database'

interface WeeklyClicksChartProps {
  data: WeeklyClick[]
}

export default function WeeklyClicksChart({ data }: WeeklyClicksChartProps) {
  // Transform data for chart
  const chartData = data.map(item => ({
    date: new Date(item.click_date).toLocaleDateString('id-ID', { 
      month: 'short', 
      day: 'numeric' 
    }),
    clicks: item.total_clicks,
  }))

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(15, 15, 18, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              backdropFilter: 'blur(8px)',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar 
            dataKey="clicks" 
            fill="url(#colorClicks)" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
        }
