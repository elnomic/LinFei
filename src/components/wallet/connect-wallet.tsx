'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Wallet, Loader2 } from 'lucide-react'
import { signInWithWallet } from '@/lib/supabase/auth'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    ethereum?: any
  }
}

export function ConnectWallet({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const connectWallet = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if MetaMask is installed
      if (!window.ethereum) {
        setError('Please install MetaMask or another Web3 wallet')
        return
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      const walletAddress = accounts[0]

      // Sign in with wallet
      const { user, error: authError } = await signInWithWallet(walletAddress)

      if (authError) {
        throw authError
      }

      if (user) {
        // Store user in localStorage
        localStorage.setItem('linfei_user', JSON.stringify(user))
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={connectWallet}
        disabled={loading}
        className={cn(
          "flex items-center justify-center gap-2 px-6 py-3",
          "bg-primary text-primary-foreground rounded-lg",
          "font-medium transition-all duration-200",
          "hover:opacity-90 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-danger text-center">{error}</p>
      )}
    </div>
  )
}
