'use client'

import { BottomNav } from '@/components/layout/bottom-nav'

export default function PointsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Points</h1>
        <div className="bg-card p-6 rounded-lg border border-border text-center">
          <div className="text-4xl font-bold text-primary mb-2">0</div>
          <p className="text-muted-foreground">Total Points</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm font-medium">Trading</div>
              <div className="text-lg font-bold">0</div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm font-medium">Referral</div>
              <div className="text-lg font-bold">0</div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
