import type { ElementType, ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * The gilded, translucent panel used by every content section. Renders as a
 * <div> by default; pass `as="article"` / `as="figure"` for semantics.
 */
export function Card({
  as,
  hover = true,
  className,
  children,
}: {
  as?: ElementType
  /** Adds the gold border-highlight on hover. */
  hover?: boolean
  className?: string
  children: ReactNode
}) {
  const Tag = as ?? 'div'
  return (
    <Tag
      className={cx(
        'rounded-xl border border-gilt/15 bg-obscur-ink/60 backdrop-blur-sm',
        hover && 'transition hover:border-gilt/40',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
