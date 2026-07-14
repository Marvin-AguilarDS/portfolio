import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

type Variant = 'solid' | 'outline'

const base =
  'focus-gilt group inline-flex items-center justify-center gap-2 rounded-full transition'

const variants: Record<Variant, string> = {
  solid:
    'bg-gradient-to-r from-gilt-deep to-gilt-ember px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-obscur-void hover:brightness-110',
  outline:
    'border border-gilt/30 bg-obscur-ink/60 px-6 py-3 text-lumiere-bone hover:border-gilt/70 hover:text-gilt',
}

/**
 * A gilded call-to-action rendered as a link (`href`). `solid` is the primary
 * gold pill; `outline` is the translucent bordered variant.
 */
export function Button({
  href,
  variant = 'solid',
  external = true,
  className,
  children,
}: {
  href: string
  variant?: Variant
  external?: boolean
  className?: string
  children: ReactNode
}) {
  const rel = external ? 'noreferrer noopener' : undefined
  const target = external ? '_blank' : undefined
  return (
    <a href={href} target={target} rel={rel} className={cx(base, variants[variant], className)}>
      {children}
    </a>
  )
}
