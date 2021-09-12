import trampolineSound from './assets/sounds/trampoline.mp3';
import teleportSound from './assets/sounds/teleport.mp3';
import keySound from './assets/sounds/key.mp3';
import spikesSound from './assets/sounds/spikes.mp3';
import doorSound from './assets/sounds/door.mp3';
import level01Music from './assets/sounds/level-01.mp3';
import { SoundRegisterOptions } from './types';

export const SOUND_ID = {
  TRAMPOLINE: 'trampoline',
  TELEPORT: 'teleport',
  KEY: 'key',
  SPIKES: 'spikes',
  DOOR: 'door',
  MUSIC: 'music',
} as const;

export const sounds: SoundRegisterOptions[] = [
  { id: SOUND_ID.TRAMPOLINE, src: trampolineSound, isLooped: false },
  { id: SOUND_ID.TELEPORT, src: teleportSound, isLooped: false },
  { id: SOUND_ID.KEY, src: keySound, isLooped: false },
  { id: SOUND_ID.SPIKES, src: spikesSound, isLooped: false },
  { id: SOUND_ID.DOOR, src: doorSound, isLooped: false },
  { id: SOUND_ID.MUSIC, src: level01Music, isLooped: true },
];
