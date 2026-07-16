'use client'

import { useState } from 'react'

export function DashboardChart() {
  const data = [
    { time: '00:00', value: 42000 },
    { time: '04:00', value: 42500 },
    { time: '08:00', value: 43000 },
    { time: '12:00', value: 42800 },
    { time: '16:00', value: 43250 },
    { time: '20:00', value: 43500 },
  ]

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#A0A0A0]">$43,500</span>
        <span className="text-xs text-[#00D084]">+2.5%</span>
        <span className="text-xs text-[#A0A0A0]">$42,000</span>
      </div>
      
      <div className="h-[120px] flex items-end gap-1.5">
        {data.map((d, i) => {
          const height = ((d.value - minValue) / range) * 100
          const isGreen = i > 0 && d.value > data[i-1].value
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full rounded-t-sm transition-all"
                style={{ 
                  height: `${Math.max(height, 2)}%`,
                  backgroundColor: isGreen ? '#00D084' : '#FF5C5C',
                  minHeight: '2px'
                }}
              />
              <span className="text-[8px] text-[#6B7280]">{d.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
