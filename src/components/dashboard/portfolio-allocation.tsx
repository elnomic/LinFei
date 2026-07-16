'use client'

export function PortfolioAllocation() {
  const data = [
    { name: 'BTC', value: 40, color: '#5B8CFF' },
    { name: 'ETH', value: 25, color: '#00D084' },
    { name: 'SOL', value: 20, color: '#FF5C5C' },
    { name: 'XRP', value: 10, color: '#FFB020' },
    { name: 'Other', value: 5, color: '#A855F7' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Portfolio Allocation</h3>
        <button className="text-xs text-[#5B8CFF]">View All</button>
      </div>
      
      <div className="space-y-2.5">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-white flex-1">{item.name}</span>
            <span className="text-sm font-medium text-white">{item.value}%</span>
            <div className="w-20 h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all" 
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
