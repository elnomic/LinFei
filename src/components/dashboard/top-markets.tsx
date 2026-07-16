'use client'

import { useRouter } from 'next/navigation'
import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { formatCurrency, cn } from '@/lib/utils'

export function TopMarkets() {
  const router = useRouter()
  
  const markets = [
    { symbol: 'BTC', price: 43250, change: 2.5, volume: 1250000000 },
    { symbol: 'ETH', price: 2250, change: -1.2, volume: 750000000 },
    { symbol: 'SOL', price: 95, change: 5.8, volume: 350000000 },
    { symbol: 'XRP', price: 0.65, change: -0.5, volume: 280000000 },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Top Markets</h3>
        <button 
          onClick={() => router.push('/markets')}
          className="text-xs text-[#5B8CFF]"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-2">
        {markets.map((market) => (
          <div
            key={market.symbol}
            onClick={() => router.push(`/trade?pair=${market.symbol}`)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0B0B] active:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#5B8CFF]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#5B8CFF]">{market.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{market.symbol}</p>
                <p className="text-xs text-[#6B7280]">
                  Vol {formatCurrency(market.volume / 1e6)}M
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-white">{formatCurrency(market.price)}</p>
              <p className={cn(
                "text-xs flex items-center gap-1 justify-end",
                market.change >= 0 ? "text-[#00D084]" : "text-[#FF5C5C]"
              )}>
                {market.change >= 0 ? '▲' : '▼'}
                {Math.abs(market.change)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
