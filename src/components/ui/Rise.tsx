import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Staggered "rise + fade" entrance. Drop any number of <Rise> children inside a
 * container whose `variants` define a `staggerChildren` transition (as
 * SectionShell does) and they animate in sequence.
 */
export function Rise({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
