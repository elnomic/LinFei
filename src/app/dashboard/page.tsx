'use client'

import { BottomNav } from '@/components/layout/bottom-nav'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <DashboardContent />
      <BottomNav />
    </div>
  )
}
