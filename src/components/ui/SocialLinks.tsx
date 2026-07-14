import { cx } from '@/lib/cx'
import { Icon } from './Icon'
import type { SocialLink } from '@/types/portfolio'

/**
 * A row of social links. Two looks:
 *   variant="icon"    round icon-only buttons  (menu / about)
 *   variant="labeled" icon + text pills        (contact)
 */
export function SocialLinks({
  links,
  variant = 'icon',
  className,
}: {
  links: SocialLink[]
  variant?: 'icon' | 'labeled'
  className?: string
}) {
  return (
    <div className={cx('flex flex-wrap items-center gap-3', className)}>
      {links.map((s) =>
        variant === 'labeled' ? (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-gilt flex items-center gap-2 rounded-full border border-gilt/25 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-lumiere-ash transition hover:border-gilt/60 hover:text-gilt"
          >
            <Icon name={s.icon} className="h-5 w-5" />
            {s.label}
          </a>
        ) : (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={s.label}
            className="focus-gilt rounded-full border border-gilt/25 p-2.5 text-lumiere-ash transition hover:border-gilt/60 hover:text-gilt"
          >
            <Icon name={s.icon} className="h-5 w-5" />
          </a>
        ),
      )}
    </div>
  )
}
