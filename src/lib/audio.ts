// ---------------------------------------------------------------------------
// Background-music configuration.
//
// Drop an audio file at `public/audio/theme.mp3` (or change the path / env var)
// and it will loop softly behind the portfolio. If the file is absent, the
// sound control hides itself — nothing breaks.
//
// NOTE: the actual Clair Obscur: Expedition 33 soundtrack is copyrighted and is
// NOT bundled here. Use a track you have the rights to (your own, royalty-free,
// or a properly licensed copy).
// ---------------------------------------------------------------------------

import { asset } from './asset'

export const MUSIC_SRC = import.meta.env.VITE_MUSIC_SRC ?? asset('/audio/theme.wav')

/** Soft ambient level (0–1). */
export const MUSIC_VOLUME = 0.2

export const MUSIC_STORAGE_KEY = 'expedition-music'
