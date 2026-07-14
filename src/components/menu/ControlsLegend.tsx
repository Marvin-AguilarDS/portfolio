import { Kbd } from '@/components/ui'
import { SECTIONS } from '@/lib/sections'

/** The pinned keyboard-controls legend at the bottom of the main menu. */
export function ControlsLegend() {
  return (
    <footer className="shrink-0 border-t border-gilt/10 px-6 py-3.5 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-lumiere-ash/45">
        <span>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd> Navigate
        </span>
        <span>
          <Kbd>Enter</Kbd> Open
        </span>
        <span>
          <Kbd>Esc</Kbd> Back
        </span>
        <span>
          <Kbd>1</Kbd>–<Kbd>{SECTIONS.length}</Kbd> Jump
        </span>
        <span className="hidden sm:inline">
          <Kbd>Tab</Kbd> Focus
        </span>
      </div>
    </footer>
  )
}
