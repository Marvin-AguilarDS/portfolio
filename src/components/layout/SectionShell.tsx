import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Eyebrow, GiltDivider, Kbd } from '@/components/ui'
import { SECTIONS, type SectionId } from '@/lib/sections'

/**
 * The container every section renders into. It fills the viewport, pins a
 * translucent top bar (back + breadcrumb), and lets the document scroll
 * naturally — so long sections read like proper pages instead of a clipped box.
 */
export function SectionShell({
  id,
  subtitle,
  onBack,
  children,
}: {
  id: SectionId
  subtitle?: string
  onBack: () => void
  children: ReactNode
}) {
  const meta = SECTIONS.find((s) => s.id === id)!
  const index = SECTIONS.findIndex((s) => s.id === id) + 1

  return (
    <motion.section
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative z-20 min-h-screen w-full"
    >
      {/* sticky top bar */}
      <div className="sticky top-0 z-30 border-b border-gilt/15 bg-obscur-void/25 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 sm:px-10">
          <button
            onClick={onBack}
            className="focus-gilt group inline-flex items-center gap-2 rounded-full border border-gilt/25 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-lumiere-ash transition hover:border-gilt/60 hover:text-gilt"
          >
            <span className="transition group-hover:-translate-x-0.5">←</span>
            <span>Menu</span>
            <span className="ml-1 hidden sm:inline">
              <Kbd>Esc</Kbd>
            </span>
          </button>
          <Eyebrow as="span" tracking="wider">
            <span className="text-gilt/70">{meta.numeral}</span> · {meta.label}
          </Eyebrow>
        </div>
      </div>

      {/* content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16"
      >
        <header className="mb-10">
          <Eyebrow tracking="widest" tone="gilt">
            Chapter {meta.numeral} of {SECTIONS.length}
          </Eyebrow>
          <h2 className="mt-2 pb-1.5 font-display text-5xl font-semibold leading-[1.1] text-gilt-shimmer sm:text-6xl">
            {meta.label}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl font-body text-lg text-lumiere-ash">{subtitle}</p>
          )}
          <GiltDivider className="mt-6" />
        </header>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
        >
          {children}
        </motion.div>

        <footer className="mt-16 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-lumiere-ash/40">
          <span className="h-px w-8 bg-gilt/30" />
          Expedition · 33 · {String(index).padStart(2, '0')}
          <span className="h-px w-8 bg-gilt/30" />
        </footer>
      </motion.div>
    </motion.section>
  )
}
