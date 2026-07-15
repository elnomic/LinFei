'use client'

import { createContext, useContext, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'

const SupabaseContext = createContext<{ supabase: any }>({ supabase: null })

export function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider')
  }
  return context
}
