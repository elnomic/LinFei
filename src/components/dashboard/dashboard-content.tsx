'use client'

import { useEffect, useState } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  Clock,
  BarChart3,
  Award,
  Zap,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { DashboardChart } from './dashboard-chart'
import { QuickTradeButton } from '../trade/quick-trade-button'
import { PortfolioAllocation } from './portfolio-allocation'
import { TopMarkets } from './top-markets'

export function DashboardContent() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('linfei_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Sample data
  const stats = {
    totalBalance: 12450.75,
    unrealizedPnl: 342.50,
    todayPnl: 125.30,
    openPositions: 3,
    winRate: 68.5,
    totalPoints: 2450,
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#5B8CFF]/10 via-[#A855F7]/5 to-transparent px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-[#A0A0A0] mt-0.5">
              Welcome back, {user?.username || 'Trader'} 👋
            </p>
          </div>
          <QuickTradeButton />
        </div>

        {/* Total Balance */}
        <div className="bg-[#151515] rounded-2xl p-5 border border-[#2A2A2A]">
          <p className="text-sm text-[#A0A0A0]">Total Balance</p>
          <p className="text-3xl font-bold text-white mt-1">
            ${formatCurrency(stats.totalBalance)}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-[#00D084] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2.4%
            </span>
            <span className="text-xs text-[#6B7280]">24h change</span>
          </div>
        </div>
      </div>

      {/* Stats Grid - 2x2 */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {/* Unrealized PnL */}
          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0]">Unrealized PnL</p>
              <div className="p-1.5 rounded-lg bg-[#00D084]/10">
                <TrendingUp className="w-3.5 h-3.5 text-[#00D084]" />
              </div>
            </div>
            <p className="text-lg font-bold text-[#00D084]">
              ${formatCurrency(stats.unrealizedPnl)}
            </p>
            <p className="text-xs text-[#00D084] mt-1">+12.5%</p>
          </div>

          {/* Today's PnL */}
          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0]">Today's PnL</p>
              <div className="p-1.5 rounded-lg bg-[#FF5C5C]/10">
                <TrendingDown className="w-3.5 h-3.5 text-[#FF5C5C]" />
              </div>
            </div>
            <p className="text-lg font-bold text-[#FF5C5C]">
              ${formatCurrency(stats.todayPnl)}
            </p>
            <p className="text-xs text-[#FF5C5C] mt-1">-5.2%</p>
          </div>

          {/* Open Positions */}
          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0]">Open Positions</p>
              <div className="p-1.5 rounded-lg bg-[#5B8CFF]/10">
                <BarChart3 className="w-3.5 h-3.5 text-[#5B8CFF]" />
              </div>
            </div>
            <p className="text-lg font-bold text-white">
              {stats.openPositions}
            </p>
            <p className="text-xs text-[#6B7280] mt-1">Win Rate {stats.winRate}%</p>
          </div>

          {/* Total Points */}
          <div className="bg-[#151515] rounded-xl p-4 border border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0]">Total Points</p>
              <div className="p-1.5 rounded-lg bg-[#FFB020]/10">
                <Award className="w-3.5 h-3.5 text-[#FFB020]" />
              </div>
            </div>
            <p className="text-lg font-bold text-[#FFB020]">
              {stats.totalPoints.toLocaleString()}
            </p>
            <p className="text-xs text-[#6B7280] mt-1">Bronze Tier</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 mt-4">
        <div className="bg-[#151515] rounded-2xl p-4 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Portfolio Performance</h3>
            <div className="flex gap-1">
              {['1D', '1W', '1M'].map((tf) => (
                <button
                  key={tf}
                  className="px-2.5 py-1 text-xs rounded-lg text-[#A0A0A0] bg-[#0B0B0B] hover:bg-[#5B8CFF]/10 hover:text-[#5B8CFF] transition-colors"
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <DashboardChart />
        </div>
      </div>

      {/* Portfolio & Markets */}
      <div className="px-4 mt-4 space-y-4">
        <div className="bg-[#151515] rounded-2xl p-4 border border-[#2A2A2A]">
          <PortfolioAllocation />
        </div>
        <div className="bg-[#151515] rounded-2xl p-4 border border-[#2A2A2A]">
          <TopMarkets />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => window.location.href = '/trade'}
            className="bg-[#151515] rounded-xl p-3 text-center border border-[#2A2A2A] active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5B8CFF]/10 flex items-center justify-center mx-auto mb-1.5">
              <Zap className="w-5 h-5 text-[#5B8CFF]" />
            </div>
            <p className="text-xs font-medium text-white">Trade</p>
          </button>
          <button 
            onClick={() => window.location.href = '/points'}
            className="bg-[#151515] rounded-xl p-3 text-center border border-[#2A2A2A] active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFB020]/10 flex items-center justify-center mx-auto mb-1.5">
              <Sparkles className="w-5 h-5 text-[#FFB020]" />
            </div>
            <p className="text-xs font-medium text-white">Points</p>
          </button>
          <button 
            onClick={() => window.location.href = '/account'}
            className="bg-[#151515] rounded-xl p-3 text-center border border-[#2A2A2A] active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00D084]/10 flex items-center justify-center mx-auto mb-1.5">
              <Wallet className="w-5 h-5 text-[#00D084]" />
            </div>
            <p className="text-xs font-medium text-white">Wallet</p>
          </button>
        </div>
      </div>
    </div>
  )
}
