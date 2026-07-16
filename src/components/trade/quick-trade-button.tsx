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
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5B8CFF] text-white text-sm font-medium active:scale-95 transition-transform"
      >
        <ArrowUpRight className="w-4 h-4" />
        Trade
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-[#151515] rounded-xl shadow-xl border border-[#2A2A2A] p-2 z-50">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#2A2A2A]">
              <span className="text-sm font-medium text-white">Quick Trade</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#2A2A2A] rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-[#A0A0A0]" />
              </button>
            </div>
            <div className="py-1">
              {['BTC', 'ETH', 'SOL', 'XRP'].map((pair) => (
                <button
                  key={pair}
                  onClick={() => {
                    router.push(`/trade?pair=${pair}`)
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#2A2A2A] rounded-lg transition-colors"
                >
                  {pair}/USD
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
