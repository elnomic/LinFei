'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { TradingChart } from './trading-chart'
import { OrderBook } from './order-book'
import { TradePanel } from './trade-panel'
import { TradeTabs } from './trade-tabs'
import { PriceHeader } from './price-header'

export function TradeContent() {
  const searchParams = useSearchParams()
  const [selectedPair, setSelectedPair] = useState(searchParams?.get('pair') || 'BTC')
  const [currentPrice, setCurrentPrice] = useState(43250)

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Price Header */}
      <PriceHeader 
        pair={selectedPair}
        price={currentPrice}
        change24h={2.5}
        high24h={43500}
        low24h={42800}
        volume24h={1250000000}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 p-4">
        {/* Chart - takes 2/3 on desktop */}
        <div className="lg:col-span-2">
          <TradingChart pair={selectedPair} />
        </div>

        {/* Order Book - takes 1/3 on desktop */}
        <div className="lg:col-span-1">
          <OrderBook pair={selectedPair} />
        </div>
      </div>

      {/* Trade Panel & Tabs */}
      <div className="p-4 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TradeTabs pair={selectedPair} />
          </div>
          <div className="lg:col-span-1">
            <TradePanel 
              pair={selectedPair}
              currentPrice={currentPrice}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
