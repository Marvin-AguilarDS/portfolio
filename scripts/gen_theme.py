"""
Generates an ORIGINAL soft, melancholic ambient loop (A-minor, slow pedal-tone
score with gentle music-box arpeggios) as a seamless WAV.

Wholly original / procedurally synthesized -> no third-party copyright.
Standard library only (no numpy/ffmpeg needed).
"""
import math, wave, array

SR = 32000
DUR = 8.0          # seconds per chord
NCH = 8            # chords in the progression
XFADE = 3.0        # crossfade seconds for a seamless loop
FLOOR = 0.22       # pad never fully silent between chords

Ln = int(SR * DUR * NCH)   # final loop length (samples)
Xn = int(SR * XFADE)
N = Ln + Xn                # render extra tail, then fold it back

# A-minor progression: Am F C G Am F Dm E  (E = dramatic dominant back to Am)
# each chord = mid-register triad frequencies (Hz)
CHORDS = [
    [220.00, 261.63, 329.63],  # Am : A3 C4 E4
    [174.61, 220.00, 261.63],  # F  : F3 A3 C4
    [261.63, 329.63, 392.00],  # C  : C4 E4 G4
    [196.00, 246.94, 293.66],  # G  : G3 B3 D4
    [220.00, 261.63, 329.63],  # Am
    [174.61, 220.00, 261.63],  # F
    [293.66, 349.23, 440.00],  # Dm : D4 F4 A4
    [164.81, 207.65, 246.94],  # E  : E3 G#3 B3
]

# high music-box arpeggio tones per chord (one octave up-ish), 3 per bar
ARP = [
    [440.00, 523.25, 659.25],
    [349.23, 440.00, 523.25],
    [523.25, 659.25, 783.99],
    [493.88, 587.33, 783.99],
    [659.25, 523.25, 440.00],
    [523.25, 440.00, 349.23],
    [587.33, 698.46, 880.00],
    [659.25, 830.61, 987.77],
]

DRONE_A = 110.0    # low A pedal tone throughout
DRONE_E = 164.81   # its fifth

buf = [0.0] * N
TWO_PI = 2.0 * math.pi

# --- pads + drone (per-sample) ---------------------------------------------
for i in range(N):
    t = i / SR
    bar = int(t // DUR)
    ci = bar % NCH
    frac = (t - bar * DUR) / DUR
    env = FLOOR + (1.0 - FLOOR) * math.sin(math.pi * frac)  # gentle swell
    s = 0.0
    for f in CHORDS[ci]:
        s += math.sin(TWO_PI * f * t) + 0.28 * math.sin(TWO_PI * 2.0 * f * t)
    s *= env * 0.13
    d = 0.10 * math.sin(TWO_PI * DRONE_A * t) + 0.045 * math.sin(TWO_PI * DRONE_E * t)
    buf[i] = s + d

# --- music-box arpeggio (note events) --------------------------------------
def add_note(start_s, freq, amp, length_s, decay=2.4):
    n0 = int(start_s * SR)
    ln = int(length_s * SR)
    for k in range(ln):
        idx = n0 + k
        if idx >= N:
            break
        tt = k / SR
        e = math.exp(-tt * decay)
        # soft attack over first 15ms to avoid clicks
        atk = min(1.0, tt / 0.015)
        buf[idx] += amp * e * atk * (
            math.sin(TWO_PI * freq * tt) + 0.25 * math.sin(TWO_PI * 2.0 * freq * tt)
        )

for bar in range(NCH + 1):          # +1 so the tail (loop seam) mirrors bar 0
    tones = ARP[bar % NCH]
    for k, f in enumerate(tones):
        add_note(bar * DUR + k * (DUR / len(tones)), f, 0.055, 2.6)

# --- fold the tail back over the head for a seamless loop -------------------
out = [0.0] * Ln
for i in range(Ln):
    if i < Xn:
        w = i / Xn
        out[i] = buf[i] * w + buf[i + Ln] * (1.0 - w)
    else:
        out[i] = buf[i]

# --- normalize + write 16-bit mono WAV -------------------------------------
peak = max(1e-6, max(abs(v) for v in out))
gain = 0.72 / peak
samples = array.array("h", (int(max(-1.0, min(1.0, v * gain)) * 32767) for v in out))

path = "public/audio/theme.wav"
with wave.open(path, "w") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(samples.tobytes())

print(f"wrote {path}: {Ln/SR:.1f}s, {len(samples)*2/1024:.0f} KB")
