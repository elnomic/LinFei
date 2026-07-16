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
    <div className="min-h-screen bg-[#0B0B0B] pb-20">
      {/* Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#5B8CFF]/20 via-[#A855F7]/10 to-transparent p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B8CFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#A855F7]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
              <p className="text-sm text-[#A0A0A0] mt-1">
                Welcome back, {user?.username || 'Trader'} 👋
              </p>
            </div>
            <QuickTradeButton />
          </div>

          {/* Total Balance Card */}
          <div className="mt-6 bg-[#151515]/80 backdrop-blur-xl border border-[#2A2A2A]/50 rounded-2xl p-6">
            <p className="text-sm text-[#A0A0A0]">Total Balance</p>
            <p className="text-4xl font-bold text-white mt-1">
              ${formatCurrency(stats.totalBalance)}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-[#00D084] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2.4%
              </span>
              <span className="text-xs text-[#6B7280]">24h change</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A] hover:border-[#5B8CFF]/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#A0A0A0]">Unrealized PnL</p>
                <p className="text-lg font-bold text-[#00D084] mt-1">
                  ${formatCurrency(stats.unrealizedPnl)}
                </p>
                <p className="text-xs text-[#00D084] mt-1">+12.5%</p>
              </div>
              <div className="p-2 rounded-xl bg-[#5B8CFF]/10">
                <TrendingUp className="w-4 h-4 text-[#5B8CFF]" />
              </div>
            </div>
          </div>

          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A] hover:border-[#5B8CFF]/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#A0A0A0]">Today's PnL</p>
                <p className="text-lg font-bold text-[#00D084] mt-1">
                  ${formatCurrency(stats.todayPnl)}
                </p>
                <p className="text-xs text-[#00D084] mt-1">+5.2%</p>
              </div>
              <div className="p-2 rounded-xl bg-[#5B8CFF]/10">
                <Clock className="w-4 h-4 text-[#5B8CFF]" />
              </div>
            </div>
          </div>

          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A] hover:border-[#5B8CFF]/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#A0A0A0]">Open Positions</p>
                <p className="text-lg font-bold text-white mt-1">
                  {stats.openPositions}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">Win Rate {stats.winRate}%</p>
              </div>
              <div className="p-2 rounded-xl bg-[#5B8CFF]/10">
                <BarChart3 className="w-4 h-4 text-[#5B8CFF]" />
              </div>
            </div>
          </div>

          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A] hover:border-[#5B8CFF]/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#A0A0A0]">Total Points</p>
                <p className="text-lg font-bold text-[#FFB020] mt-1">
                  {stats.totalPoints.toLocaleString()}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">Bronze Tier</p>
              </div>
              <div className="p-2 rounded-xl bg-[#FFB020]/10">
                <Award className="w-4 h-4 text-[#FFB020]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart & Portfolio */}
      <div className="p-4 space-y-4">
        <div className="bg-[#151515] rounded-2xl p-6 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Portfolio Performance</h3>
            <div className="flex gap-1">
              {['1D', '1W', '1M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  className="px-3 py-1 text-xs rounded-lg text-[#A0A0A0] hover:bg-[#5B8CFF]/10 hover:text-[#5B8CFF] transition-colors"
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <DashboardChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#151515] rounded-2xl p-6 border border-[#2A2A2A]">
            <PortfolioAllocation />
          </div>
          <div className="bg-[#151515] rounded-2xl p-6 border border-[#2A2A2A]">
            <TopMarkets />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => window.location.href = '/trade'}
            className="bg-[#151515] rounded-xl p-4 text-center border border-[#2A2A2A] hover:border-[#5B8CFF]/50 transition-all group"
          >
            <Zap className="w-6 h-6 mx-auto mb-2 text-[#5B8CFF]" />
            <p className="text-xs font-medium text-white">Quick Trade</p>
          </button>
          <button 
            onClick={() => window.location.href = '/points'}
            className="bg-[#151515] rounded-xl p-4 text-center border border-[#2A2A2A] hover:border-[#5B8CFF]/50 transition-all group"
          >
            <Sparkles className="w-6 h-6 mx-auto mb-2 text-[#FFB020]" />
            <p className="text-xs font-medium text-white">Earn Points</p>
          </button>
          <button 
            onClick={() => window.location.href = '/account'}
            className="bg-[#151515] rounded-xl p-4 text-center border border-[#2A2A2A] hover:border-[#5B8CFF]/50 transition-all group"
          >
            <Wallet className="w-6 h-6 mx-auto mb-2 text-[#00D084]" />
            <p className="text-xs font-medium text-white">Deposit</p>
          </button>
        </div>
      </div>
    </div>
  )
}
