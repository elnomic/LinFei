'use client'

import { createContext, useContext, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const SupabaseContext = createContext<{ supabase: any }>({ supabase: null })

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  return context
}
