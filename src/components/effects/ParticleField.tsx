import { useMemo } from 'react'

/**
 * The signature Expedition atmosphere: slow-drifting motes of gilded light and
 * rising embers over a candlelit void. Pure CSS animations (see tailwind
 * keyframes `drift` / `emberRise`) so it stays cheap and respects
 * prefers-reduced-motion.
 */
export function ParticleField({ count = 36 }: { count?: number }) {
  // Deterministic pseudo-random layout (no Math.random at module scope needed,
  // and stable across renders).
  const motes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280
      const r = seed / 233280
      const r2 = ((i + 1) * 7919) % 997 / 997
      const r3 = ((i + 3) * 6151) % 811 / 811
      return {
        left: `${(r * 100).toFixed(2)}%`,
        size: 1 + r2 * 3,
        duration: 16 + r3 * 26,
        delay: -(r * 40),
        ember: i % 5 === 0,
        opacity: 0.25 + r2 * 0.5,
      }
    })
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className={m.ember ? 'animate-emberRise absolute bottom-0' : 'animate-drift absolute bottom-[-10px]'}
          style={{
            left: m.left,
            width: `${m.size}px`,
            height: `${m.size}px`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
            borderRadius: '9999px',
            background: m.ember
              ? 'radial-gradient(circle, #f6e2a8, #d98d4a 60%, transparent 70%)'
              : 'radial-gradient(circle, rgba(246,226,168,0.95), rgba(233,196,106,0.2) 60%, transparent 70%)',
            boxShadow: m.ember
              ? '0 0 8px 2px rgba(217,141,74,0.6)'
              : '0 0 6px 1px rgba(233,196,106,0.4)',
            opacity: m.opacity,
          }}
        />
      ))}
    </div>
  )
}
