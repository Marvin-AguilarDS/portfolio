import { motion } from 'framer-motion'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui'
import type { SectionDef } from '@/lib/sections'

/**
 * A single chapter row in the main menu. Highlights (gilded panel, filled
 * marker, revealed hint, arrow) when `active`.
 */
export function MenuItem({
  section,
  index,
  active,
  onHover,
  onSelect,
}: {
  section: SectionDef
  index: number
  active: boolean
  onHover: (i: number) => void
  onSelect: () => void
}) {
  return (
    <li>
      <button
        role="menuitem"
        aria-current={active}
        onMouseEnter={() => onHover(index)}
        onFocus={() => onHover(index)}
        onClick={onSelect}
        className="focus-gilt group relative flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors"
      >
        {active && (
          <motion.span
            layoutId="menu-active"
            className="absolute inset-0 rounded-xl border border-gilt/45 bg-gradient-to-r from-gilt/20 via-gilt/5 to-transparent shadow-[0_0_28px_-10px_rgba(233,196,106,0.7)]"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        )}

        <span
          className={cx(
            'relative z-10 text-lg transition-colors duration-300',
            active ? 'text-gilt' : 'text-gilt/25',
          )}
        >
          {active ? '◆' : '◇'}
        </span>

        <span className="relative z-10 flex-1 overflow-hidden">
          <span className="flex items-baseline gap-2.5">
            <span className="w-6 shrink-0 font-mono text-xs text-gilt/50">{section.numeral}</span>
            <span
              className={cx(
                'font-display text-2xl leading-none transition-colors duration-300 sm:text-3xl',
                active
                  ? 'text-lumiere-bone'
                  : 'text-lumiere-bone/50 group-hover:text-lumiere-bone/80',
              )}
            >
              {section.label}
            </span>
          </span>
          <motion.span
            initial={false}
            animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="block overflow-hidden pl-[2.3rem] font-body text-sm text-lumiere-ash"
          >
            {section.hint}
          </motion.span>
        </span>

        <span
          className={cx(
            'relative z-10 transition-all duration-300',
            active
              ? 'translate-x-0 text-gilt opacity-100'
              : '-translate-x-2 text-gilt/40 opacity-0 group-hover:opacity-60',
          )}
        >
          <Icon name="arrow" className="h-5 w-5" />
        </span>
      </button>
    </li>
  )
}
