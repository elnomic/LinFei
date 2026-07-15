'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const COLORS = ['#5B8CFF', '#00D084', '#FF5C5C', '#FFB020', '#A855F7']

export function PortfolioAllocation() {
  const [data, setData] = useState([
    { name: 'BTC', value: 40 },
    { name: 'ETH', value: 25 },
    { name: 'SOL', value: 20 },
    { name: 'XRP', value: 10 },
    { name: 'Other', value: 5 },
  ])

  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <h3 className="font-semibold mb-4">Portfolio Allocation</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-xs">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
