import SoundSample from './SoundSample';

type DecodedSoundSample = {
  buffer: Promise<AudioBuffer>;
  isLooped: boolean;
};

export default class SoundController {
  ctx: AudioContext;
  decodedSamples: Record<number | string, DecodedSoundSample>;

  constructor() {
    this.ctx = new AudioContext();
    this.decodedSamples = {};
  }

  async add(soundSample: SoundSample): Promise<void> {
    this.decodedSamples[soundSample.id] = {
      buffer: this.ctx.decodeAudioData(soundSample.buffer),
      isLooped: soundSample.isLooped,
    };
  }

  async play(id: string): Promise<void> {
    if (!this.decodedSamples[id]) {
      return;
    }

    const sample = this.decodedSamples[id];
    const sourceNode = this.ctx.createBufferSource();

    sourceNode.buffer = await sample.buffer;
    sourceNode.loop = sample.isLooped || false;
    sourceNode.connect(this.ctx.destination);
    sourceNode.start();
  }

  destroy(): void {
    this.decodedSamples = {};
    setTimeout(() => {
      this.ctx.close();
    }, 1000);
  }
}
