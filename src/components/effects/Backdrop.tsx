import { ParticleField } from './ParticleField'

/**
 * The full-screen Expedition atmosphere layered behind everything: a flickering
 * candlelit gradient, drifting gilded motes, film grain, and a vignette.
 */
export function Backdrop() {
  return (
    <>
      <div className="expedition-backdrop animate-flicker" />
      <ParticleField count={40} />
      <div className="expedition-grain" />
    </>
  )
}
