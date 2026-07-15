'use client'

import { BottomNav } from '@/components/layout/bottom-nav'
import { MarketsContent } from '@/components/markets/markets-content'

export default function MarketsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <MarketsContent />
      <BottomNav />
    </div>
  )
}
