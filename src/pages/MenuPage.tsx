import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MainMenu } from '@/components/menu/MainMenu'
import { usePortfolio } from '@/context/PortfolioContext'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'
import { SECTIONS, type SectionId } from '@/lib/sections'

export function MenuPage() {
  const { data } = usePortfolio()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const go = useCallback((id: SectionId) => navigate(`/${id}`), [navigate])

  useKeyboardNav({
    count: SECTIONS.length,
    index: activeIndex,
    setIndex: setActiveIndex,
    onConfirm: () => go(SECTIONS[activeIndex].id),
    onBack: () => {},
    enabled: true,
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <MainMenu
        profile={data.profile}
        activeIndex={activeIndex}
        onHover={setActiveIndex}
        onSelect={go}
      />
    </motion.div>
  )
}
