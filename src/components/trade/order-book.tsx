'use client'

import { useState, useEffect } from 'react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface OrderBookProps {
  pair: string
}

interface Order {
  price: number
  size: number
  total: number
}

export function OrderBook({ pair }: OrderBookProps) {
  const [asks, setAsks] = useState<Order[]>([])
  const [bids, setBids] = useState<Order[]>([])
  const [spread, setSpread] = useState(0)

  useEffect(() => {
    // Simulate real-time order book updates
    const generateOrders = (side: 'ask' | 'bid') => {
      const basePrice = 43250
      const orders: Order[] = []
      const count = 8
      
      for (let i = 0; i < count; i++) {
        const priceOffset = side === 'ask' 
          ? (i + 1) * 2.5 
          : -(i + 1) * 2.5
        const price = basePrice + priceOffset
        const size = Math.random() * 2 + 0.5
        const total = orders.length > 0 
          ? orders[orders.length - 1].total + size 
          : size
        
        orders.push({ price, size, total })
      }
      
      return orders
    }

    const newAsks = generateOrders('ask').sort((a, b) => a.price - b.price)
    const newBids = generateOrders('bid').sort((a, b) => b.price - a.price)
    
    setAsks(newAsks)
    setBids(newBids)
    setSpread(newAsks[0]?.price - newBids[0]?.price || 0)
  }, [pair])

  const maxTotal = Math.max(
    ...bids.map(b => b.total),
    ...asks.map(a => a.total)
  )

  return (
    <div className="bg-card rounded-lg border border-border p-4 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Order Book</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Spread</span>
          <span className="text-xs font-medium">{formatCurrency(spread)}</span>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Order Book Content */}
      <div className="flex-1 overflow-y-auto space-y-0.5">
        {/* Asks (Sell orders) */}
        {asks.map((order) => (
          <div key={order.price} className="grid grid-cols-3 text-xs relative">
            <div className="absolute right-0 top-0 h-full bg-danger/10" 
                 style={{ width: `${(order.total / maxTotal) * 100}%` }} />
            <span className="text-danger font-medium relative z-10">{formatCurrency(order.price)}</span>
            <span className="text-right relative z-10">{formatNumber(order.size, 3)}</span>
            <span className="text-right relative z-10">{formatNumber(order.total, 3)}</span>
          </div>
        ))}

        {/* Spread */}
        <div className="text-center py-2 text-xs text-muted-foreground border-y border-border my-1">
          Spread: {formatCurrency(spread)} ({((spread / 43250) * 100).toFixed(2)}%)
        </div>

        {/* Bids (Buy orders) */}
        {bids.map((order) => (
          <div key={order.price} className="grid grid-cols-3 text-xs relative">
            <div className="absolute right-0 top-0 h-full bg-success/10" 
                 style={{ width: `${(order.total / maxTotal) * 100}%` }} />
            <span className="text-success font-medium relative z-10">{formatCurrency(order.price)}</span>
            <span className="text-right relative z-10">{formatNumber(order.size, 3)}</span>
            <span className="text-right relative z-10">{formatNumber(order.total, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  )
          }
