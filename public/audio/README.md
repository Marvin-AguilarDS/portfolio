# Background music

A short, softly-looping track plays behind the portfolio, with a mute/unmute
control in the bottom-left corner.

**Shipped by default:** `theme.wav` — an original, procedurally-composed ambient
loop (slow A-minor pedal-tone pads + gentle music-box arpeggios, ~64s, seamless).
It was generated for this project, so it's free of third-party copyright and
yours to use however you like. (Regenerate/tweak it with
`scripts/gen_theme.py`.)

## Using a different track

Drop your file here and point the app at it:

- Easiest: name it `theme.wav` (overwrites the default).
- Any browser-playable format works (`.mp3`, `.ogg`, `.m4a`). For another
  name/format, set `VITE_MUSIC_SRC` (see `.env.example`) or edit `MUSIC_SRC` in
  `src/lib/audio.ts`. Default volume is soft (0.2) via `MUSIC_VOLUME` there.
- If no file is present, the sound control simply doesn't appear.

## Royalty-free sources that fit the mood

- **Pixabay Music** (no attribution) — "melancholic piano", "sad orchestral ambient".
- **incompetech.com** (Kevin MacLeod, CC-BY) — e.g. *Anguish*, *Private Reflection*.
- **Free Music Archive** — filter CC0 / CC-BY, Ambient / Soundtrack.

## Licensing note

The actual *Clair Obscur: Expedition 33* soundtrack is copyrighted and is **not**
included. Only add music you have the right to use.
