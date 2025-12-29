'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 5000, expenses: 2398, profit: 2602 },
  { name: 'Mar', revenue: 6000, expenses: 3800, profit: 2200 },
  { name: 'Apr', revenue: 5780, expenses: 3908, profit: 1872 },
  { name: 'May', revenue: 6890, expenses: 4800, profit: 2090 },
  { name: 'Jun', revenue: 7390, expenses: 4800, profit: 2590 },
  { name: 'Jul', revenue: 8490, expenses: 5300, profit: 3190 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="expensesGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          <linearGradient id="profitGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="currentColor" 
          strokeOpacity={0.1}
          vertical={false}
        />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
            padding: '12px 16px',
          }}
          itemStyle={{ color: '#E5E7EB' }}
          labelStyle={{ color: '#9CA3AF', marginBottom: '8px' }}
          formatter={(value: number, name: string) => [
            `$${value.toLocaleString()}`,
            name.charAt(0).toUpperCase() + name.slice(1)
          ]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="url(#revenueGradient)"
          strokeWidth={3}
          dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff', filter: 'url(#glow)' }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="url(#expensesGradient)"
          strokeWidth={3}
          dot={{ r: 4, fill: '#F43F5E', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, fill: '#F43F5E', strokeWidth: 2, stroke: '#fff', filter: 'url(#glow)' }}
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="url(#profitGradient)"
          strokeWidth={3}
          dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff', filter: 'url(#glow)' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

