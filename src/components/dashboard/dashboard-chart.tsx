'use client'

import { useState } from 'react'

export function DashboardChart() {
  const [activeTab, setActiveTab] = useState('1D')
  
  // Simulasi data
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
  const range = maxValue - minValue

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {['1D', '1W', '1M'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                activeTab === tab ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">+2.5%</span>
      </div>
      
      <div className="h-[200px] flex items-end gap-1">
        {data.map((d, i) => {
          const height = ((d.value - minValue) / range) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full bg-primary/50 hover:bg-primary transition-all rounded-t-sm"
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{d.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
