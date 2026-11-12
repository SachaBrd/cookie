// Synthesized sounds (Web Audio, no files). volume: 0..1.
let audio;
const ctx = () => (audio ??= new AudioContext());

const SCALE = [0, 3, 5, 7, 10, 12, 15]; // minor pentatonic, in semitones
const DRIVE = new Float32Array(256).map((_, i) => Math.tanh((i / 128 - 1) * 6));

function envelope(a, peak, length) {
  const g = a.createGain();
  g.gain.setValueAtTime(peak, a.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + length);
  return g;
}

// Sawtooth through soft-clip distortion + lowpass ≈ a crunchy electric guitar pluck.
export function note(volume = 1) {
  const a = ctx();
  const osc = a.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 220 * 2 ** (SCALE[Math.floor(Math.random() * SCALE.length)] / 12);
  const drive = a.createWaveShaper();
  drive.curve = DRIVE;
  const tone = a.createBiquadFilter();
  tone.frequency.value = 2500;
  osc.connect(drive).connect(tone).connect(envelope(a, 0.2 * volume, 0.7)).connect(a.destination);
  osc.start();
  osc.stop(a.currentTime + 0.7);
}

// `to`: optional end frequency for a sweep.
function noise(freq, length, peak, delay = 0, to = freq) {
  const a = ctx();
  const buf = a.createBuffer(1, a.sampleRate * length, a.sampleRate);
  buf.getChannelData(0).forEach((_, i, d) => { d[i] = Math.random() * 2 - 1; });
  const src = a.createBufferSource();
  src.buffer = buf;
  const band = a.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.setValueAtTime(freq, a.currentTime + delay);
  band.frequency.exponentialRampToValueAtTime(to, a.currentTime + delay + length);
  const g = a.createGain();
  g.gain.setValueAtTime(0, a.currentTime);
  g.gain.setValueAtTime(peak, a.currentTime + delay);
  g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + delay + length);
  src.connect(band).connect(g).connect(a.destination);
  src.start(a.currentTime + delay);
}

// Short band-passed noise burst ≈ a page being turned.
export const page = (volume = 1) => noise(3000, 0.2, 0.5 * volume);

// Two quick high scratches ≈ a red pen ticking a copy.
export function scribble(volume = 1) {
  noise(6000, 0.06, 0.4 * volume);
  noise(5000, 0.09, 0.4 * volume, 0.08);
}

// Sine with a falling pitch ≈ a soft thud of wet clay on the wheel.
export function clay(volume = 1) {
  const a = ctx();
  const osc = a.createOscillator();
  osc.frequency.setValueAtTime(180, a.currentTime);
  osc.frequency.exponentialRampToValueAtTime(55, a.currentTime + 0.2);
  osc.connect(envelope(a, 0.5 * volume, 0.25)).connect(a.destination);
  osc.start();
  osc.stop(a.currentTime + 0.25);
}

// Square wave hopping between pitches ≈ a 3D printer's stepper motors.
export function printer(volume = 1) {
  const a = ctx(), t = a.currentTime;
  const osc = a.createOscillator();
  osc.type = 'square';
  for (const d of [0, 0.06, 0.12]) osc.frequency.setValueAtTime(300 + Math.random() * 500, t + d);
  const tone = a.createBiquadFilter();
  tone.frequency.value = 1200;
  osc.connect(tone).connect(envelope(a, 0.08 * volume, 0.2)).connect(a.destination);
  osc.start();
  osc.stop(t + 0.2);
}

// Triangle wave sliding up then down ≈ a meow (random pitch: two cats).
export function meow(volume = 1) {
  const a = ctx(), t = a.currentTime;
  const osc = a.createOscillator();
  osc.type = 'triangle';
  const base = 500 + Math.random() * 300;
  osc.frequency.setValueAtTime(base, t);
  osc.frequency.linearRampToValueAtTime(base * 1.5, t + 0.12);
  osc.frequency.linearRampToValueAtTime(base * 0.8, t + 0.35);
  osc.connect(envelope(a, 0.15 * volume, 0.4)).connect(a.destination);
  osc.start();
  osc.stop(t + 0.4);
}

// Short falling triangle ≈ a kick in a football.
export function kick(volume = 1) {
  const a = ctx(), t = a.currentTime;
  const osc = a.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, t);
  osc.frequency.exponentialRampToValueAtTime(90, t + 0.1);
  osc.connect(envelope(a, 0.4 * volume, 0.12)).connect(a.destination);
  osc.start();
  osc.stop(t + 0.12);
}

// Two sine partials ≈ the oven timer's "ding".
export function ding(volume = 1) {
  const a = ctx();
  for (const [freq, peak] of [[1568, 0.1], [2349, 0.05]]) {
    const osc = a.createOscillator();
    osc.frequency.value = freq;
    osc.connect(envelope(a, peak * volume, 0.6)).connect(a.destination);
    osc.start();
    osc.stop(a.currentTime + 0.6);
  }
}

// Noise sweeping upward ≈ the whoosh of a flip.
export const whoosh = (volume = 1) => noise(600, 0.3, 0.5 * volume, 0, 3000);

// Square wave diving in pitch ≈ a sci-fi "pew" laser.
export function laser(volume = 1) {
  const a = ctx(), t = a.currentTime;
  const osc = a.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1400, t);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.18);
  const tone = a.createBiquadFilter();
  tone.frequency.value = 2500;
  osc.connect(tone).connect(envelope(a, 0.06 * volume, 0.2)).connect(a.destination);
  osc.start();
  osc.stop(t + 0.2);
}

// Short notes one after another (oscillator `type`, `step` seconds apart).
function arpeggio(type, freqs, step, peak, length) {
  const a = ctx(), t = a.currentTime;
  freqs.forEach((freq, i) => {
    const osc = a.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const g = a.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.setValueAtTime(peak, t + i * step);
    g.gain.exponentialRampToValueAtTime(0.001, t + i * step + length);
    osc.connect(g).connect(a.destination);
    osc.start(t + i * step);
    osc.stop(t + i * step + length + 0.02);
  });
}

// Three quick rising square notes ≈ a video game "bling".
export const bling = (volume = 1) => arpeggio('square', [660, 880, 1320], 0.06, 0.05 * volume, 0.1);

// Two soft sine notes ≈ a phone notification.
export const notif = (volume = 1) => arpeggio('sine', [1046, 1568], 0.09, 0.12 * volume, 0.15);

// Wobbling, rising sawtooth ≈ a cordless drill.
export function drill(volume = 1) {
  const a = ctx(), t = a.currentTime;
  const osc = a.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(110, t);
  osc.frequency.linearRampToValueAtTime(170, t + 0.25);
  const lfo = a.createOscillator();
  lfo.frequency.value = 40;
  const depth = a.createGain();
  depth.gain.value = 30;
  lfo.connect(depth).connect(osc.frequency);
  const tone = a.createBiquadFilter();
  tone.frequency.value = 900;
  osc.connect(tone).connect(envelope(a, 0.15 * volume, 0.3)).connect(a.destination);
  osc.start(); lfo.start();
  osc.stop(t + 0.3); lfo.stop(t + 0.3);
}

// Broad noise sweeping down ≈ a splash in the pool.
export const splash = (volume = 1) => noise(2000, 0.35, 0.6 * volume, 0, 400);
