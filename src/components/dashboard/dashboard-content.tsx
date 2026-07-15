'use client'

import { useEffect, useState } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  Clock,
  BarChart3
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { DashboardChart } from './dashboard-chart'
import { QuickTradeButton } from '../trade/quick-trade-button'
import { PortfolioAllocation } from './portfolio-allocation'
import { TopMarkets } from './top-markets'
import { cn } from '@/lib/utils'

export function DashboardContent() {
  const [user, setUser] = useState<any>(null)
  const [stats] = useState({
    totalBalance: 0,
    unrealizedPnl: 0,
    todayPnl: 0,
    openPositions: 0,
  })

  useEffect(() => {
    const userData = localStorage.getItem('linfei_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.username || 'Trader'}
            </p>
          </div>
          <QuickTradeButton />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Total Balance"
            value={formatCurrency(stats.totalBalance)}
            icon={Wallet}
          />
          <StatCard
            title="Unrealized PnL"
            value={formatCurrency(stats.unrealizedPnl)}
            icon={TrendingUp}
            valueColor={stats.unrealizedPnl >= 0 ? 'text-success' : 'text-danger'}
          />
          <StatCard
            title="Today's PnL"
            value={formatCurrency(stats.todayPnl)}
            icon={Clock}
            valueColor={stats.todayPnl >= 0 ? 'text-success' : 'text-danger'}
          />
          <StatCard
            title="Open Positions"
            value={stats.openPositions.toString()}
            icon={BarChart3}
          />
        </div>

        {/* Chart */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <DashboardChart />
        </div>

        {/* Portfolio & Markets */}
        <div className="grid grid-cols-1 gap-4">
          <PortfolioAllocation />
          <TopMarkets />
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  valueColor 
}: { 
  title: string
  value: string
  icon: any
  valueColor?: string
}) {
  return (
    <div className="bg-card p-3 rounded-lg border border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className={cn("text-lg font-semibold mt-1", valueColor)}>
            {value}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
          }
