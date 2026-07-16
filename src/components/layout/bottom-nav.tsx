'use client'

import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  BarChart3, 
  TrendingUp, 
  Coins, 
  User 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BarChart3, label: 'Markets', path: '/markets' },
  { icon: TrendingUp, label: 'Trade', path: '/trade' },
  { icon: Coins, label: 'Points', path: '/points' },
  { icon: User, label: 'Account', path: '/account' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0B] border-t border-[#2A2A2A] backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/')
          
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative",
                "touch-target transition-all duration-200"
              )}
            >
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#5B8CFF] rounded-full" />
              )}
              <item.icon className={cn(
                "h-5 w-5 transition-all duration-200",
                isActive ? "text-[#5B8CFF]" : "text-[#6B7280]"
              )} />
              <span className={cn(
                "text-[10px] font-medium transition-all duration-200",
                isActive ? "text-[#5B8CFF]" : "text-[#6B7280]"
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
