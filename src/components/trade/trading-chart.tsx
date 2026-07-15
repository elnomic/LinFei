'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    TradingView: any
  }
}

interface TradingChartProps {
  pair: string
  className?: string
}

export function TradingChart({ pair, className }: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        // Clean up existing widget
        if (widgetRef.current) {
          widgetRef.current.remove()
        }

        widgetRef.current = new window.TradingView.widget({
          container: containerRef.current,
          width: '100%',
          height: 400,
          symbol: `${pair}USD`,
          interval: '15',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#151515',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: false,
          hotlist: false,
          calendar: false,
          news: [],
          studies: [
            'MASimple@tv-basicstudies',
            'RSI@tv-basicstudies',
            'MACD@tv-basicstudies'
          ],
          overrides: {
            'paneProperties.background': '#151515',
            'paneProperties.vertGridProperties.color': '#2a2a2a',
            'paneProperties.horzGridProperties.color': '#2a2a2a',
          },
          time_frames: [
            { text: '1m', resolution: '1' },
            { text: '5m', resolution: '5' },
            { text: '15m', resolution: '15' },
            { text: '1H', resolution: '60' },
            { text: '4H', resolution: '240' },
            { text: '1D', resolution: 'D' },
          ],
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
      if (widgetRef.current) {
        widgetRef.current.remove()
      }
    }
  }, [pair])

  return (
    <div className={cn("bg-card rounded-lg border border-border p-4", className)}>
      <div className="h-[400px]">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  )
}
