import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'LinFei - Perpetual DEX',
  description: 'Trade perpetual futures with lightning speed on Hyperliquid',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ background: '#0B0B0B' }}>
      <body className={`${inter.variable} font-sans antialiased`} style={{ background: '#0B0B0B', minHeight: '100vh' }}>
        <div className="min-h-screen bg-[#0B0B0B]">
          {children}
        </div>
      </body>
    </html>
  )
}
