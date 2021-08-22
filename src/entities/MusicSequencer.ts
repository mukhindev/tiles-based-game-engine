import Synth from './Synth';

type Track = {
  synth: Synth;
  pattern: (number | string)[];
};

type MusicSequencerOptions = {
  tracks: Track[];
};

export default class MusicSequencer {
  tracks: Track[];
  isInitiated: boolean;
  frame: number;
  step: number;

  constructor(options: MusicSequencerOptions) {
    this.tracks = options.tracks;
    this.isInitiated = false;
    this.frame = 0;
    this.step = 0;
  }

  init() {
    this.tracks.forEach(({ synth }) => {
      synth.init();
      this.isInitiated = true;
    });
  }

  setNextStep() {
    this.frame += 1;

    if (this.step * 10 < this.frame) {
      this.step += 1;
    }
  }

  updateTrack(trackIndex: number) {
    const track = this.tracks[trackIndex];
    const { synth, pattern } = track;
    const note = pattern[this.step % pattern.length];

    if (note) {
      synth.connect(note);
    } else {
      synth.disconnect();
    }
  }

  update() {
    this.updateTrack(0);

    this.setNextStep();
  }
}
