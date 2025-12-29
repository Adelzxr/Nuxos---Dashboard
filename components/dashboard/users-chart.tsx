'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 3000 },
  { name: 'Mar', users: 5000 },
  { name: 'Apr', users: 4780 },
  { name: 'May', users: 5890 },
  { name: 'Jun', users: 6390 },
  { name: 'Jul', users: 7490 },
]

export function UsersChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
            <stop offset="100%" stopColor="#6366F1" stopOpacity={0.8} />
          </linearGradient>
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
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
            padding: '12px 16px',
          }}
          itemStyle={{ color: '#E5E7EB' }}
          labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
          formatter={(value: number) => [value.toLocaleString(), 'Users']}
          cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
        />
        <Bar 
          dataKey="users" 
          fill="url(#barGradient)" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

