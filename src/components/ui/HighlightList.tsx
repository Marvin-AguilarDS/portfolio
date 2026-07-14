import { cx } from '@/lib/cx'

/**
 * A gilded ◆-bulleted list of highlights, shared by Experience, Projects and
 * Education. `size="sm"` matches the tighter card variant used in Projects.
 */
export function HighlightList({
  items,
  size = 'base',
  className,
}: {
  items: string[]
  size?: 'sm' | 'base'
  className?: string
}) {
  if (!items.length) return null
  return (
    <ul className={cx('space-y-1.5', className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cx(
            'flex gap-2',
            size === 'sm' ? 'text-sm text-lumiere-bone/75' : 'text-lumiere-bone/80',
          )}
        >
          <span className={cx('text-gilt/70', size === 'sm' ? 'mt-0.5' : 'mt-1')}>◆</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
