import text from '../shared/text';

export type SoundSampleConstructorOptions = {
  id: number | string;
  src: string;
  isLooped: boolean;
};

export default class SoundSample {
  public id: number | string;
  public src: string;
  public isLooped: boolean;
  public buffer: ArrayBuffer;

  constructor(options: SoundSampleConstructorOptions) {
    this.id = options.id;
    this.src = options.src;
    this.isLooped = options.isLooped;
    this.buffer = new ArrayBuffer(0);
  }

  async load(): Promise<SoundSample> {
    try {
      const response = await fetch(this.src);

      this.buffer = await response.arrayBuffer();

      return this;
    } catch (error) {
      throw new Error(text.errors.loadingSound);
    }
  }
}
