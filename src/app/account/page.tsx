'use client'

import { BottomNav } from '@/components/layout/bottom-nav'
import { Wallet, Settings, LogOut, User, Gift, Bell, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('linfei_user')
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Account</h1>
        
        <div className="bg-card p-4 rounded-lg border border-border mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Trader</p>
              <p className="text-xs text-muted-foreground">0x1234...5678</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <AccountMenuItem icon={Wallet} label="Wallet" />
          <AccountMenuItem icon={Gift} label="Referral" />
          <AccountMenuItem icon={Bell} label="Notifications" />
          <AccountMenuItem icon={Shield} label="Security" />
          <AccountMenuItem icon={Settings} label="Settings" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-danger"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

function AccountMenuItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors">
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span>{label}</span>
    </button>
  )
}
