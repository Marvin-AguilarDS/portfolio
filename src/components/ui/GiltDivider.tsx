import { cx } from '@/lib/cx'

/** A thin, center-fading gold rule (see the `.gilt-rule` utility in index.css). */
export function GiltDivider({ className }: { className?: string }) {
  return <div className={cx('gilt-rule', className)} />
}
