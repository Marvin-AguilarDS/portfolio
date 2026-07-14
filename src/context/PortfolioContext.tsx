import { createContext, useContext, type ReactNode } from 'react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import type { PortfolioData } from '@/types/portfolio'

interface PortfolioContextValue {
  data: PortfolioData
  source: string
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

/**
 * Loads the portfolio once and shares it with every route. While loading (or on
 * error) it renders the themed status screens instead of the routed content.
 */
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { data, loading, error, source } = usePortfolioData()

  if (loading) {
    return (
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="animate-breathe font-display text-7xl text-gilt-shimmer">33</div>
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-lumiere-ash">
          Preparing the expedition…
        </p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-4xl text-lumiere-rose">The path is lost</p>
        <p className="max-w-md font-body text-lumiere-ash">
          Could not load portfolio data from the <code className="text-gilt">{source}</code>{' '}
          source.
        </p>
        {error && <p className="font-mono text-xs text-lumiere-ash/70">{error}</p>}
      </div>
    )
  }

  return (
    <PortfolioContext.Provider value={{ data, source }}>{children}</PortfolioContext.Provider>
  )
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within a PortfolioProvider')
  return ctx
}
