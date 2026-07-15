'use client'

import { BottomNav } from '@/components/layout/bottom-nav'
import { TradeContent } from '@/components/trade/trade-content'

export default function TradePage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <TradeContent />
      <BottomNav />
    </div>
  )
}
