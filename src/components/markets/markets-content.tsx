'use client'

import { useState } from 'react'
import { Search, Star, TrendingUp, Clock, Filter, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn, formatCurrency } from '@/lib/utils'

interface Market {
  symbol: string
  lastPrice: number
  change24h: number
  volume: number
  fundingRate: number
  openInterest: number
  isFavorite?: boolean
}

export function MarketsContent() {
  const [markets] = useState<Market[]>([
    { symbol: 'BTC', lastPrice: 43250, change24h: 2.5, volume: 1250000000, fundingRate: 0.01, openInterest: 350000000, isFavorite: true },
    { symbol: 'ETH', lastPrice: 2250, change24h: -1.2, volume: 750000000, fundingRate: 0.02, openInterest: 200000000 },
    { symbol: 'SOL', lastPrice: 95, change24h: 5.8, volume: 350000000, fundingRate: 0.03, openInterest: 150000000 },
    { symbol: 'XRP', lastPrice: 0.65, change24h: -0.5, volume: 280000000, fundingRate: 0.01, openInterest: 80000000 },
    { symbol: 'SUI', lastPrice: 1.85, change24h: 3.2, volume: 120000000, fundingRate: 0.05, openInterest: 45000000 },
    { symbol: 'HYPE', lastPrice: 0.45, change24h: 12.5, volume: 50000000, fundingRate: 0.08, openInterest: 20000000 },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'favorites' | 'trending' | 'volume'>('all')
  const router = useRouter()

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    if (filter === 'favorites') return matchesSearch && market.isFavorite
    if (filter === 'trending') return matchesSearch && Math.abs(market.change24h) > 3
    if (filter === 'volume') return matchesSearch && market.volume > 200000000
    return matchesSearch
  })

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold gradient-text">Markets</h1>
          
          {/* Search Bar */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {['all', 'favorites', 'trending', 'volume'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap",
                  "transition-all duration-200",
                  filter === f 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card text-muted-foreground hover:bg-muted"
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Markets List */}
      <div className="p-4 space-y-3">
        {filteredMarkets.map((market) => (
          <div
            key={market.symbol}
            onClick={() => router.push(`/trade?pair=${market.symbol}`)}
            className="glass rounded-xl p-4 card-hover cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{market.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{market.symbol}</span>
                    <span className="text-xs text-muted-foreground">/USD</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>Vol {formatCurrency(market.volume / 1e6)}M</span>
                    <span>•</span>
                    <span>OI {formatCurrency(market.openInterest / 1e6)}M</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold">{formatCurrency(market.lastPrice)}</div>
                <div className={cn(
                  "text-xs font-medium flex items-center justify-end gap-1",
                  market.change24h >= 0 ? "text-success" : "text-danger"
                )}>
                  {market.change24h >= 0 ? '▲' : '▼'}
                  {Math.abs(market.change24h)}%
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Funding {((market.fundingRate) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
              }
