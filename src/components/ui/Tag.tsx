import { cx } from '@/lib/cx'

/** A single tech/stack chip. */
export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cx(
        'rounded-full border border-lumiere-teal/40 bg-lumiere-teal/10 px-3 py-1 font-mono text-xs text-lumiere-bone/80',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** A wrapped row of tags, e.g. a project/experience tech stack. */
export function TagList({ items, className }: { items: string[]; className?: string }) {
  if (!items.length) return null
  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  )
}
