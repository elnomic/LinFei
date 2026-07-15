'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { supabase } from '@/lib/supabase/auth'

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalBalance: 0,
    unrealizedPnl: 0,
    realizedPnl: 0,
    todayPnl: 0,
    openPositions: 0,
    tradingVolume: 0,
    winRate: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const userData = localStorage.getItem('linfei_user')
      if (!userData) return

      const user = JSON.parse(userData)
      
      const { data: account } = await supabase
        .from('trading_accounts')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (account) {
        setStats({
          totalBalance: account.balance,
          unrealizedPnl: account.unrealized_pnl,
          realizedPnl: account.realized_pnl,
          todayPnl: account.unrealized_pnl, // Placeholder
          openPositions: 0, // Will be calculated
          tradingVolume: account.total_volume,
          winRate: account.win_rate,
        })
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatItem label="Total Balance" value={formatCurrency(stats.totalBalance)} />
      <StatItem label="Unrealized PnL" value={formatCurrency(stats.unrealizedPnl)} />
      <StatItem label="Today's PnL" value={formatCurrency(stats.todayPnl)} />
      <StatItem label="Win Rate" value={`${stats.winRate}%`} />
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-3 rounded-lg border border-border">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  )
}
