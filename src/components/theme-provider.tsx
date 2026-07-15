'use client'

import * as React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Simple theme provider tanpa next-themes
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Set dark theme default
    document.documentElement.classList.add('dark')
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
