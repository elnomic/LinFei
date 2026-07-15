'use client'

import { useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'

interface TradePanelProps {
  pair: string
  currentPrice: number
}

export function TradePanel({ pair, currentPrice }: TradePanelProps) {
  const [side, setSide] = useState<'long' | 'short'>('long')
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market')
  const [leverage, setLeverage] = useState(1)
  const [quantity, setQuantity] = useState('')
  const [takeProfit, setTakeProfit] = useState('')
  const [stopLoss, setStopLoss] = useState('')
  const [marginMode, setMarginMode] = useState<'cross' | 'isolated'>('cross')

  const maxLeverage = 10

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      {/* Order Type */}
      <div className="grid grid-cols-3 gap-1 mb-4">
        {['market', 'limit', 'stop'].map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type as any)}
            className={cn(
              "py-1.5 text-xs font-medium rounded transition-colors",
              orderType === type 
                ? "bg-primary/20 text-primary" 
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Side Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setSide('long')}
          className={cn(
            "py-2 rounded font-medium transition-all",
            side === 'long'
              ? "bg-success text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          Long
        </button>
        <button
          onClick={() => setSide('short')}
          className={cn(
            "py-2 rounded font-medium transition-all",
            side === 'short'
              ? "bg-danger text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          Short
        </button>
      </div>

      {/* Leverage */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm text-muted-foreground">Leverage</label>
          <span className="text-sm font-medium">{leverage}x</span>
        </div>
        <input
          type="range"
          min={1}
          max={maxLeverage}
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1x</span>
          <span>{maxLeverage}x</span>
        </div>
      </div>

      {/* Price (for limit orders) */}
      {orderType !== 'market' && (
        <div className="mb-3">
          <label className="text-sm text-muted-foreground block mb-1.5">Price</label>
          <input
            type="number"
            placeholder={formatCurrency(currentPrice)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      )}

      {/* Quantity */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm text-muted-foreground">Quantity</label>
          <span className="text-sm font-medium">{quantity || '0'}</span>
        </div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="flex gap-2 mt-2">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => {
                // Calculate quantity based on balance and percentage
              }}
              className="flex-1 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* Margin Mode */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setMarginMode('cross')}
          className={cn(
            "py-1.5 text-xs font-medium rounded transition-colors",
            marginMode === 'cross'
              ? "bg-primary/20 text-primary"
              : "hover:bg-muted text-muted-foreground"
          )}
        >
          Cross
        </button>
        <button
          onClick={() => setMarginMode('isolated')}
          className={cn(
            "py-1.5 text-xs font-medium rounded transition-colors",
            marginMode === 'isolated'
              ? "bg-primary/20 text-primary"
              : "hover:bg-muted text-muted-foreground"
          )}
        >
          Isolated
        </button>
      </div>

      {/* TP/SL */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Take Profit</label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            placeholder="TP"
            className="w-full px-2 py-1.5 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Stop Loss</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="SL"
            className="w-full px-2 py-1.5 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Reduce Only */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="reduceOnly"
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="reduceOnly" className="text-sm text-muted-foreground">
          Reduce Only
        </label>
      </div>

      {/* Trade Button */}
      <button
        className={cn(
          "w-full py-3 rounded-lg font-medium text-white transition-all",
          "hover:opacity-90 active:scale-95",
          side === 'long' ? "bg-success" : "bg-danger"
        )}
      >
        {side === 'long' ? 'Open Long' : 'Open Short'} {pair}
      </button>
    </div>
  )
        }
