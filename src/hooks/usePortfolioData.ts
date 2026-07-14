import { useEffect, useState } from 'react'
import { portfolioAdapter } from '@/data'
import type { PortfolioData } from '@/types/portfolio'

interface State {
  data: PortfolioData | null
  loading: boolean
  error: string | null
  source: string
}

/**
 * Loads the whole portfolio from the configured adapter (JSON or Mongo).
 * The component tree never knows or cares which backend answered.
 */
export function usePortfolioData(): State {
  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
    source: portfolioAdapter.source,
  })

  useEffect(() => {
    let cancelled = false
    portfolioAdapter
      .getAll()
      .then((data) => {
        if (!cancelled) {
          setState((s) => ({ ...s, data, loading: false }))
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState((s) => ({
            ...s,
            loading: false,
            error: err instanceof Error ? err.message : 'Unknown error',
          }))
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
