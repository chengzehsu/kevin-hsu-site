"""Synthesize the launch film's original, royalty-free background track from code alone.

Usage: python3 scripts/film-bgm.py 66.8 <out.wav> [seed]
Bouncy off-beat chords, glockenspiel melody, finger snaps and a soft shaker. Every voice is low-passed and
nothing is hard-clipped, because noise-based hats and plucks read as harsh.

The arrangement follows the film clock. 120 BPM puts a bar every 2 seconds, so the chapters start on a bar at 12s
and the three tagline lines land on the beats at 57, 58 and 59 seconds. If the film is re-timed, change these.
"""
import sys
import wave

import numpy as np
from scipy.signal import lfilter

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = BEAT * 4

FULL_FROM, BREAK_FROM, OUTRO_FROM = 12.0, 56.0, 61.0  # film clock: chapters, tagline, end card
TAGLINE_HITS = (57.0, 58.0, 59.0)

CHORDS = [[60, 64, 67], [59, 62, 67], [57, 60, 64], [57, 60, 65]]  # C G Am F
ROOTS = [48, 43, 45, 41]
MELODY = [
    [(0, 76, .5), (.5, 79, .5), (1.5, 76, .5), (2, 74, .5), (3, 72, .5)],
    [(0, 74, .5), (1, 71, .5), (1.5, 74, .5), (2.5, 79, 1)],
    [(0, 76, .5), (.5, 72, .5), (1, 76, .5), (2, 81, .5), (3, 79, .5), (3.5, 76, .5)],
    [(0, 77, .5), (1, 76, .5), (2, 74, .5), (2.5, 72, 1)],
    [(0, 72, .5), (.5, 74, .5), (1, 76, .5), (1.5, 79, .5), (2.5, 76, .5), (3, 79, .5)],
    [(0, 83, .5), (1, 81, .5), (1.5, 79, .5), (2.5, 74, 1)],
    [(0, 81, .5), (.5, 79, .5), (1, 76, .5), (2, 79, .5), (3, 84, .5)],
    [(0, 81, .5), (1, 79, .5), (2, 72, 1.5)],
]


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def tvec(dur):
    return np.arange(int(SR * dur)) / SR


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    return lfilter([1 - a], [1, -a], x)


def soft_key(freq, dur):
    """Rounded e-piano-ish stab: sine + quiet 2nd harmonic, quick decay."""
    t = tvec(dur)
    env = np.exp(-t * 9) * np.minimum(1, t / 0.006)
    return (np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(2 * np.pi * 2 * freq * t) * np.exp(-t * 14)) * env


def glock(freq, dur):
    t = tvec(dur)
    env = np.exp(-t * 4.5) * np.minimum(1, t / 0.003)
    return (np.sin(2 * np.pi * freq * t) + 0.18 * np.sin(2 * np.pi * 2.76 * freq * t) * np.exp(-t * 18)) * env


def bass(freq, dur):
    t = tvec(dur)
    env = np.exp(-t * 6) * np.minimum(1, t / 0.01)
    return (np.sin(2 * np.pi * freq * t) + 0.15 * np.sin(2 * np.pi * 2 * freq * t)) * env


def kick():
    t = tvec(0.25)
    f = 48 + 60 * np.exp(-t * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)


def soft_noise(rng, dur, decay, cutoff):
    t = tvec(dur)
    n = rng.uniform(-1, 1, len(t))
    n = lowpass(n, cutoff)
    n -= lowpass(n, 1500)  # keep a band, drop the boomy part
    n /= np.max(np.abs(n)) + 1e-9
    return n * np.exp(-t * decay)


def snap(rng):
    t = tvec(0.09)
    body = np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 90)
    return 0.6 * body + 0.5 * soft_noise(rng, 0.09, 60, 5000)


def add(track, sig, at, gain):
    i = int(at * SR)
    if i >= len(track):
        return
    j = min(len(track), i + len(sig))
    track[i:j] += sig[: j - i] * gain


def room(x):
    out = x.copy()
    for d, g in ((0.029, .22), (0.043, .18), (0.061, .14), (0.089, .1)):
        k = int(d * SR)
        out[k:] += x[:-k] * g
    return out


def make(seconds, seed=7):
    rng = np.random.default_rng(seed)
    total = int(seconds * SR)
    keys, mel, bas, drm = (np.zeros(total) for _ in range(4))
    k_sig = kick()
    snaps = [snap(rng) for _ in range(4)]
    shakes = [soft_noise(rng, 0.07, 55, 6000) for _ in range(4)]
    stabs = {}
    n_bars = int(np.ceil(seconds / BAR)) + 1
    for b in range(n_bars):
        t0 = b * BAR
        chord, root = CHORDS[b % 4], ROOTS[b % 4]
        intro = t0 < FULL_FROM or t0 >= OUTRO_FROM
        tagline = BREAK_FROM <= t0 < OUTRO_FROM
        # bouncy off-beat stabs (the "and" of every beat)
        for beat in range(4):
            key = (b % 4, beat)
            if key not in stabs:
                stabs[key] = sum(soft_key(hz(m), BEAT * 0.45) for m in chord)
            add(keys, stabs[key], t0 + (beat + 0.5) * BEAT, 0.16)
        for at, m, ln in MELODY[b % 8] if not tagline else ():
            add(mel, glock(hz(m), ln * BEAT + 0.5), t0 + at * BEAT, 0.20 if not intro else 0.14)
        if intro or tagline:
            continue
        for at, m in ((0, root), (0.75, root), (1.5, root + 12), (2, root), (2.75, root + 7), (3.5, root + 12)):
            add(bas, bass(hz(m), BEAT * 0.5), t0 + at * BEAT, 0.34)
        for at in (0, 1.75, 2):
            add(drm, k_sig, t0 + at * BEAT, 0.5 if at != 1.75 else 0.3)
        for at in (1, 3):
            add(drm, snaps[(b + at) % 4], t0 + at * BEAT, 0.28)
        for e in range(8):
            add(drm, shakes[e % 4], t0 + e * 0.5 * BEAT, 0.07 if e % 2 else 0.045)
    for at in TAGLINE_HITS:
        add(drm, k_sig, at, 0.62)
        add(bas, bass(hz(ROOTS[0]), BEAT), at, 0.34)
    mix = room(keys) + room(mel) + bas + drm
    mix = lowpass(mix, 7500)
    t = np.arange(total) / SR
    mix *= np.minimum(1, t / 1.0) * np.clip((seconds - t) / 3.0, 0, 1)
    peak = np.max(np.abs(mix)) + 1e-9
    return mix / peak * 0.7


if __name__ == "__main__":
    secs, out = float(sys.argv[1]), sys.argv[2]
    seed = int(sys.argv[3]) if len(sys.argv) > 3 else 7
    audio = make(secs, seed)
    pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2")
    with wave.open(out, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(np.repeat(pcm[:, None], 2, axis=1).tobytes())
    print(out, f"{secs:.1f}s")
