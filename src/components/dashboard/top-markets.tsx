'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Market {
  symbol: string
  price: number
  change: number
  volume: number
  fundingRate: number
}

export function TopMarkets() {
  const [markets, setMarkets] = useState<Market[]>([
    { symbol: 'BTC', price: 43250, change: 2.5, volume: 1250000000, fundingRate: 0.01 },
    { symbol: 'ETH', price: 2250, change: -1.2, volume: 750000000, fundingRate: 0.02 },
    { symbol: 'SOL', price: 95, change: 5.8, volume: 350000000, fundingRate: 0.03 },
    { symbol: 'XRP', price: 0.65, change: -0.5, volume: 280000000, fundingRate: 0.01 },
    { symbol: 'SUI', price: 1.85, change: 3.2, volume: 120000000, fundingRate: 0.05 },
  ])
  const router = useRouter()

  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Top Markets</h3>
        <button 
          onClick={() => router.push('/markets')}
          className="text-sm text-primary hover:underline"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-2">
        {markets.map((market) => (
          <div
            key={market.symbol}
            onClick={() => router.push(`/trade?pair=${market.symbol}`)}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold">{market.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <p className="font-medium">{market.symbol}</p>
                <p className="text-xs text-muted-foreground">
                  Vol: {formatCurrency(market.volume / 1e6)}M
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-medium">{formatCurrency(market.price)}</p>
              <p className={cn(
                "text-xs flex items-center gap-1 justify-end",
                market.change >= 0 ? "text-success" : "text-danger"
              )}>
                {market.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(market.change)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
