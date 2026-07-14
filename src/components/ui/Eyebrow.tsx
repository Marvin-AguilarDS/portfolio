import type { ElementType, ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * The recurring small-caps, wide-tracked mono label (e.g. "EXPEDITION · 33",
 * "SELECT A CHAPTER", period / year tags). `tracking` and `tone` tune the two
 * common looks without re-typing the utility soup each time.
 */
export function Eyebrow({
  as,
  tracking = 'wide',
  tone = 'ash',
  className,
  children,
}: {
  as?: ElementType
  tracking?: 'wide' | 'wider' | 'widest'
  tone?: 'ash' | 'gilt' | 'rose'
  className?: string
  children: ReactNode
}) {
  const Tag = as ?? 'p'
  const trackingClass = {
    wide: 'tracking-[0.15em]',
    wider: 'tracking-[0.25em]',
    widest: 'tracking-[0.4em]',
  }[tracking]
  const toneClass = {
    ash: 'text-lumiere-ash/70',
    gilt: 'text-gilt/80',
    rose: 'text-lumiere-rose',
  }[tone]
  return (
    <Tag className={cx('font-mono text-xs uppercase', trackingClass, toneClass, className)}>
      {children}
    </Tag>
  )
}
