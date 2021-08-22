const getFrequency = (note) => {
  const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  let octave;
  let keyNumber;

  if (note.length === 3) {
    octave = note.charAt(2);
  } else {
    octave = note.charAt(1);
  }

  keyNumber = notes.indexOf(note.slice(0, -1));

  if (keyNumber < 3) {
    keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
  } else {
    keyNumber = keyNumber + ((octave - 1) * 12) + 1;
  }

  return 440 * 2 ** ((keyNumber - 49) / 12);
};

type SynthOptions = {
  oscillatorType: OscillatorType;
};

export default class Synth {
  oscillatorType: string;

  constructor(options: SynthOptions) {
    this.oscillatorType = options.oscillatorType || 'sawtooth';
  }

  init() {
    this.ctx = new AudioContext();
    this.osc = this.ctx.createOscillator();
    this.osc.type = this.oscillatorType;
    this.osc.frequency.value = 440;
    this.osc.start();
  }

  connect(note) {
    if (!this.osc && note) {
      return;
    }

    const freq = typeof note === 'number' ? note : getFrequency(note);

    this.osc.frequency.value = freq;
    this.osc.connect(this.ctx.destination);
  }

  disconnect() {
    if (!this.osc) {
      return;
    }

    this.osc.disconnect();
  }
}
