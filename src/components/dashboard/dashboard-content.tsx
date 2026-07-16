'use client'

import { useEffect, useState } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  Clock,
  BarChart3,
  Award,
  ArrowUpRight,
  Zap,
  Sparkles
} from 'lucide-react'
import { formatCurrency, cn } from '@/lib/utils'
import { DashboardChart } from './dashboard-chart'
import { QuickTradeButton } from '../trade/quick-trade-button'
import { PortfolioAllocation } from './portfolio-allocation'
import { TopMarkets } from './top-markets'

export function DashboardContent() {
  const [user, setUser] = useState<any>(null)
  const [stats] = useState({
    totalBalance: 12450.75,
    unrealizedPnl: 342.50,
    todayPnl: 125.30,
    openPositions: 3,
    tradingVolume: 45230.00,
    winRate: 68.5,
    totalPoints: 2450,
  })

  useEffect(() => {
    const userData = localStorage.getItem('linfei_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header dengan Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome back, {user?.username || 'Trader'} 👋
              </p>
            </div>
            <QuickTradeButton />
          </div>

          {/* Total Balance Card */}
          <div className="mt-6 glass rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-4xl font-bold mt-1">${formatCurrency(stats.totalBalance)}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2.4%
              </span>
              <span className="text-xs text-muted-foreground">24h change</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            title="Unrealized PnL"
            value={`$${formatCurrency(stats.unrealizedPnl)}`}
            icon={TrendingUp}
            valueColor={stats.unrealizedPnl >= 0 ? 'text-success' : 'text-danger'}
            trend="+12.5%"
          />
          <StatCard
            title="Today's PnL"
            value={`$${formatCurrency(stats.todayPnl)}`}
            icon={Clock}
            valueColor={stats.todayPnl >= 0 ? 'text-success' : 'text-danger'}
            trend="+5.2%"
          />
          <StatCard
            title="Open Positions"
            value={stats.openPositions.toString()}
            icon={BarChart3}
            subtitle={`Win Rate ${stats.winRate}%`}
          />
          <StatCard
            title="Total Points"
            value={stats.totalPoints.toLocaleString()}
            icon={Award}
            subtitle="Bronze Tier"
          />
        </div>
      </div>

      {/* Chart & Portfolio */}
      <div className="p-4 space-y-4">
        <div className="glass rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Portfolio Performance</h3>
            <div className="flex gap-1">
              {['1D', '1W', '1M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  className="px-3 py-1 text-xs rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <DashboardChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6 card-hover">
            <PortfolioAllocation />
          </div>
          <div className="glass rounded-2xl p-6 card-hover">
            <TopMarkets />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <QuickAction 
            icon={Zap} 
            label="Quick Trade" 
            color="text-primary"
            onClick={() => window.location.href = '/trade'}
          />
          <QuickAction 
            icon={Sparkles} 
            label="Earn Points" 
            color="text-yellow-500"
            onClick={() => window.location.href = '/points'}
          />
          <QuickAction 
            icon={Wallet} 
            label="Deposit" 
            color="text-green-500"
            onClick={() => window.location.href = '/account'}
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  valueColor,
  trend,
  subtitle
}: { 
  title: string
  value: string
  icon: any
  valueColor?: string
  trend?: string
  subtitle?: string
}) {
  return (
    <div className="glass rounded-xl p-4 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className={cn("text-lg font-bold mt-1", valueColor || "text-foreground")}>
            {value}
          </p>
          {trend && (
            <p className="text-xs text-success mt-1">{trend}</p>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

function QuickAction({ 
  icon: Icon, 
  label, 
  color, 
  onClick 
}: { 
  icon: any
  label: string
  color: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="glass rounded-xl p-4 text-center card-hover group"
    >
      <Icon className={cn("w-6 h-6 mx-auto mb-2", color)} />
      <p className="text-xs font-medium">{label}</p>
    </button>
  )
            }
