import type { ReactNode } from 'react'

/** A single keyboard key cap, used in the controls legend and hints. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-0.5 inline-flex min-w-[1.5em] items-center justify-center rounded border border-gilt/20 bg-gilt/5 px-1.5 py-0.5 font-mono text-gilt/70">
      {children}
    </kbd>
  )
}
