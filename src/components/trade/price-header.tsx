'use client'

import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface PriceHeaderProps {
  pair: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume24h: number
}

export function PriceHeader({ 
  pair, 
  price, 
  change24h, 
  high24h, 
  low24h, 
  volume24h 
}: PriceHeaderProps) {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{pair}/USD</h2>
            <div className={cn(
              "text-sm font-medium px-2 py-0.5 rounded",
              change24h >= 0 ? "text-success bg-success/10" : "text-danger bg-danger/10"
            )}>
              {change24h >= 0 ? '▲' : '▼'} {Math.abs(change24h)}%
            </div>
          </div>
          <div className="text-2xl font-bold mt-1">
            {formatCurrency(price)}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">24h High</p>
            <p className="font-medium">{formatCurrency(high24h)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">24h Low</p>
            <p className="font-medium">{formatCurrency(low24h)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">24h Volume</p>
            <p className="font-medium">{formatCurrency(volume24h / 1e6)}M</p>
          </div>
        </div>
      </div>
    </div>
  )
}
