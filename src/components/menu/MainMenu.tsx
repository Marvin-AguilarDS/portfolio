import { motion } from 'framer-motion'
import { ControlsLegend } from './ControlsLegend'
import { MenuHero } from './MenuHero'
import { MenuItem } from './MenuItem'
import { Eyebrow } from '@/components/ui'
import { SECTIONS, type SectionId } from '@/lib/sections'
import type { Profile } from '@/types/portfolio'

/**
 * The Expedition-33 title screen. A full-viewport, two-column composition:
 * an identity/hero panel (left) and a vertical, keyboard-driven chapter menu
 * (right), with a pinned controls legend.
 */
export function MainMenu({
  profile,
  activeIndex,
  onHover,
  onSelect,
}: {
  profile: Profile
  activeIndex: number
  onHover: (i: number) => void
  onSelect: (id: SectionId) => void
}) {
  return (
    <div className="relative z-20 flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
        <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <MenuHero profile={profile} />

          <motion.nav
            aria-label="Portfolio sections"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full"
          >
            <Eyebrow tracking="widest" className="mb-3 pl-4">
              Select a chapter
            </Eyebrow>
            <ul role="menu" className="flex flex-col gap-1.5">
              {SECTIONS.map((section, i) => (
                <MenuItem
                  key={section.id}
                  section={section}
                  index={i}
                  active={i === activeIndex}
                  onHover={onHover}
                  onSelect={() => onSelect(section.id)}
                />
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>

      <ControlsLegend />
    </div>
  )
}
