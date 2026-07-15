'use client'

import { useState } from 'react'

interface TradingChartProps {
  pair: string
}

export function TradingChart({ pair }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState('15m')
  
  // Generate simulated data
  const generateData = () => {
    const data = []
    let price = 43250
    for (let i = 0; i < 50; i++) {
      const change = (Math.random() - 0.5) * 200
      price += change
      data.push(price)
    }
    return data
  }

  const data = generateData()
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{pair}/USD</span>
          <span className="text-xs text-success">▲ 2.5%</span>
        </div>
        <div className="flex gap-1">
          {['1m', '5m', '15m', '1H', '4H', '1D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 text-xs rounded transition-colors ${
                timeframe === tf ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[350px] flex items-end gap-0.5">
        {data.map((price, i) => {
          const height = ((price - minValue) / range) * 100
          const isGreen = i > 0 && price > data[i-1]
          return (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all"
              style={{ 
                height: `${Math.max(height, 2)}%`,
                backgroundColor: isGreen ? '#00D084' : '#FF5C5C',
                opacity: 0.8
              }}
            />
          )
        })}
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>{formatCurrency(minValue)}</span>
        <span>{formatCurrency(maxValue)}</span>
      </div>
    </div>
  )
}

function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}
