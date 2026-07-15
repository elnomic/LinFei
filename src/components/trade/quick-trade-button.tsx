'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QuickTradeButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-primary text-primary-foreground font-medium",
          "hover:opacity-90 active:scale-95 transition-all"
        )}
      >
        <ArrowUpRight className="w-4 h-4" />
        Trade
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Quick Trade</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/trade?pair=BTC')}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded"
            >
              BTC/USD
            </button>
            <button
              onClick={() => router.push('/trade?pair=ETH')}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded"
            >
              ETH/USD
            </button>
            <button
              onClick={() => router.push('/trade?pair=SOL')}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded"
            >
              SOL/USD
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
