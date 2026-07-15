'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const generateChartData = () => {
  const data = []
  let price = 43250
  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * 100
    price += change
    data.push({
      time: i,
      price: Math.round(price * 100) / 100
    })
  }
  return data
}

interface TradingChartProps {
  pair: string
}

export function TradingChart({ pair }: TradingChartProps) {
  const data = generateChartData()

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{pair}/USD</span>
          <span className="text-xs text-success">▲ 2.5%</span>
        </div>
        <div className="flex gap-1">
          {['1m', '5m', '15m', '1H', '4H', '1D'].map((tf) => (
            <button
              key={tf}
              className="px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors"
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tick={false} />
            <YAxis stroke="#6b7280" fontSize={12} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151515',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#a0a0a0' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#5B8CFF" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
