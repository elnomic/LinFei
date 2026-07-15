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
    <div className="bg-card p-4 rounded-lg border border-border">
      <h3 className="font-semibold mb-4">Portfolio Allocation</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm flex-1">{item.name}</span>
            <span className="text-sm font-medium">{item.value}%</span>
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
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
