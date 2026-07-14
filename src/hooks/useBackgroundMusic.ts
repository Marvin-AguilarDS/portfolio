import { useCallback, useEffect, useRef, useState } from 'react'
import { MUSIC_STORAGE_KEY, MUSIC_VOLUME } from '@/lib/audio'

interface BackgroundMusic {
  /** attach to the <audio> element */
  ref: React.RefObject<HTMLAudioElement>
  /** user wants music on (persisted) */
  enabled: boolean
  /** actually producing sound right now */
  playing: boolean
  /** false once the audio source fails to load (e.g. no file present) */
  available: boolean
  toggle: () => void
  onError: () => void
  onPlay: () => void
  onPause: () => void
}

/**
 * Drives a looping background track while respecting browser autoplay policy.
 *
 * - Remembers the on/off choice in localStorage (default: on).
 * - If autoplay is blocked, it arms a one-shot listener so the track starts on
 *   the visitor's first click or keypress.
 * - Hides gracefully (`available = false`) if the audio file can't be loaded.
 */
export function useBackgroundMusic(): BackgroundMusic {
  const ref = useRef<HTMLAudioElement>(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [enabled, setEnabled] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem(MUSIC_STORAGE_KEY) !== 'off',
  )

  const attemptPlay = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.volume = MUSIC_VOLUME
    el.play().catch(() => {
      /* blocked — the gesture listener below will retry */
    })
  }, [])

  // Start / stop as `enabled` changes, with an autoplay-block fallback.
  useEffect(() => {
    const el = ref.current
    if (!el || !available) return

    if (!enabled) {
      el.pause()
      return
    }

    attemptPlay()

    const onGesture = () => attemptPlay()
    window.addEventListener('pointerdown', onGesture, { once: true })
    window.addEventListener('keydown', onGesture, { once: true })
    return () => {
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
    }
  }, [enabled, available, attemptPlay])

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem(MUSIC_STORAGE_KEY, next ? 'on' : 'off')
      } catch {
        /* ignore storage errors (private mode, etc.) */
      }
      return next
    })
  }, [])

  return {
    ref,
    enabled,
    playing,
    available,
    toggle,
    onError: () => setAvailable(false),
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
  }
}
