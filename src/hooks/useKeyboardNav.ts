import { useEffect } from 'react'

interface Options {
  /** Number of items in the list. */
  count: number
  /** Currently highlighted index. */
  index: number
  setIndex: (updater: (prev: number) => number) => void
  /** Fired on Enter / Space when a menu item is highlighted. */
  onConfirm: () => void
  /** Fired on Escape / Backspace / Left arrow. */
  onBack: () => void
  /** When false, the listeners are detached (e.g. a section is open). */
  enabled: boolean
}

/**
 * Global keyboard controller for the main menu.
 *
 *   ↑ / k / W        move selection up (wraps)
 *   ↓ / j / S        move selection down (wraps)
 *   Enter / Space /  confirm / open the highlighted section
 *   → (ArrowRight)
 *   Esc / Backspace  go back
 *   ← (ArrowLeft)
 *   Home / End       jump to first / last item
 *   1..9             jump straight to that item
 */
export function useKeyboardNav({
  count,
  setIndex,
  onConfirm,
  onBack,
  enabled,
}: Options): void {
  useEffect(() => {
    if (!enabled) return

    const handler = (e: KeyboardEvent) => {
      // Don't hijack keys while the user types in a field.
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
        case 'J':
        case 's':
        case 'S':
          e.preventDefault()
          setIndex((i) => (i + 1) % count)
          break
        case 'ArrowUp':
        case 'k':
        case 'K':
        case 'w':
        case 'W':
          e.preventDefault()
          setIndex((i) => (i - 1 + count) % count)
          break
        case 'Home':
          e.preventDefault()
          setIndex(() => 0)
          break
        case 'End':
          e.preventDefault()
          setIndex(() => count - 1)
          break
        case 'Enter':
        case ' ':
        case 'ArrowRight':
          e.preventDefault()
          onConfirm()
          break
        case 'Escape':
        case 'Backspace':
        case 'ArrowLeft':
          e.preventDefault()
          onBack()
          break
        default:
          // number shortcuts 1..count
          if (/^[1-9]$/.test(e.key)) {
            const n = Number(e.key) - 1
            if (n < count) {
              e.preventDefault()
              setIndex(() => n)
            }
          }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [count, setIndex, onConfirm, onBack, enabled])
}
