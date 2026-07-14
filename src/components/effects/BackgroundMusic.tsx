import { cx } from '@/lib/cx'
import { MUSIC_SRC } from '@/lib/audio'
import { Icon } from '@/components/ui'
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic'

/**
 * A softly-looping background track plus a small gilded on/off control.
 * Mount once inside the persistent Layout so playback survives navigation.
 */
export function BackgroundMusic() {
  const music = useBackgroundMusic()
  const soundOn = music.enabled && music.playing

  return (
    <>
      <audio
        ref={music.ref}
        src={MUSIC_SRC}
        loop
        preload="auto"
        onError={music.onError}
        onPlay={music.onPlay}
        onPause={music.onPause}
      />

      {music.available && (
        <button
          onClick={music.toggle}
          aria-pressed={music.enabled}
          aria-label={music.enabled ? 'Mute background music' : 'Play background music'}
          title={music.enabled ? 'Mute music' : 'Play music'}
          className="focus-gilt group fixed bottom-3 left-4 z-50 flex items-center gap-2 rounded-full border border-gilt/25 bg-obscur-void/50 px-3 py-2 backdrop-blur-sm transition hover:border-gilt/60"
        >
          <Icon
            name={music.enabled ? 'sound-on' : 'sound-off'}
            className={cx('h-4 w-4 transition', music.enabled ? 'text-gilt' : 'text-lumiere-ash')}
          />
          {/* three little bars that animate only while sound is actually playing */}
          <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cx(
                  'w-[2px] rounded-full bg-gilt/80',
                  soundOn ? 'animate-eq' : 'h-[3px] opacity-40',
                )}
                style={soundOn ? { animationDelay: `${i * 0.18}s` } : undefined}
              />
            ))}
          </span>
        </button>
      )}
    </>
  )
}
