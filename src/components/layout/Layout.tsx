import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Backdrop } from '@/components/effects/Backdrop'
import { BackgroundMusic } from '@/components/effects/BackgroundMusic'
import { usePortfolio } from '@/context/PortfolioContext'

/**
 * Persistent chrome shared by every route: the candlelit backdrop, the routed
 * <Outlet/> (animated on path change), and the data-source badge.
 */
export function Layout() {
  const location = useLocation()
  const { source } = usePortfolio()

  return (
    <>
      <Backdrop />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <BackgroundMusic />
      <span className="fixed bottom-3 right-4 z-50 font-mono text-[10px] uppercase tracking-[0.2em] text-lumiere-ash/40">
        data · {source}
      </span>
    </>
  )
}
