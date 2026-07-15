'use client'

import { useState } from 'react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface TradeTabsProps {
  pair: string
}

type TabType = 'positions' | 'pending' | 'orderHistory' | 'tradeHistory' | 'funding'

export function TradeTabs({ pair }: TradeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('positions')

  const tabs: { id: TabType; label: string }[] = [
    { id: 'positions', label: 'Positions' },
    { id: 'pending', label: 'Pending' },
    { id: 'orderHistory', label: 'Order History' },
    { id: 'tradeHistory', label: 'Trade History' },
    { id: 'funding', label: 'Funding' },
  ]

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'positions' && <PositionsTab />}
        {activeTab === 'pending' && <PendingOrdersTab />}
        {activeTab === 'orderHistory' && <OrderHistoryTab />}
        {activeTab === 'tradeHistory' && <TradeHistoryTab />}
        {activeTab === 'funding' && <FundingHistoryTab />}
      </div>
    </div>
  )
}

function PositionsTab() {
  const positions = [
    { symbol: 'BTC', side: 'long', size: 0.5, entryPrice: 42500, currentPrice: 43250, pnl: 375, pnlPercentage: 1.76 },
  ]

  if (positions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No open positions</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {positions.map((pos, i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-background rounded-lg">
          <div>
            <div className="font-medium">{pos.symbol}</div>
            <div className="text-xs text-muted-foreground">
              {pos.side.toUpperCase()} • {pos.size} @ {formatCurrency(pos.entryPrice)}
            </div>
          </div>
          <div className="text-right">
            <div className={cn("font-medium", pos.pnl >= 0 ? "text-success" : "text-danger")}>
              {formatCurrency(pos.pnl)}
            </div>
            <div className={cn("text-xs", pos.pnl >= 0 ? "text-success" : "text-danger")}>
              {pos.pnlPercentage}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PendingOrdersTab() {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No pending orders</p>
    </div>
  )
}

function OrderHistoryTab() {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No order history</p>
    </div>
  )
}

function TradeHistoryTab() {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No trade history</p>
    </div>
  )
}

function FundingHistoryTab() {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No funding history</p>
    </div>
  )
        }
