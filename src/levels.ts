import { SOUND_ID } from './sounds';
import { LevelRegisterOptions } from './types';

export const levels: LevelRegisterOptions[] = [
  {
    id: 1,
    startPosition: [32, 32],
    music: SOUND_ID.LEVEL_1,
    map: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 5, 0, 0, 9, 0, 0, 1, 0, 0, 0, 0, 0, 8, 1],
      [1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 10, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 10, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 7, 1, 1, 1, 7, 1, 0, 0, 1, 1, 3, 1, 0, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 2, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 10, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 14, 0, 6, 14, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    id: 2,
    startPosition: [512, 128],
    music: SOUND_ID.LEVEL_2,
    map: [
      [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 9, 0, 0, 0, 0, 11],
      [11, 0, 0, 11, 11, 0, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 7, 0, 11],
      [11, 0, 11, 11, 0, 0, 5, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 11],
      [11, 0, 0, 11, 11, 11, 11, 11, 11, 11, 11, 7, 0, 0, 0, 0, 0, 0, 0, 11],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 0, 0, 0, 0, 0, 11],
      [11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 0, 11],
      [11, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
      [11, 0, 0, 0, 0, 0, 11, 11, 4, 4, 4, 4, 4, 11, 0, 0, 0, 0, 0, 11],
      [11, 0, 0, 11, 11, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 7, 11, 11, 10, 11],
      [11, 0, 0, 0, 11, 11, 11, 0, 8, 0, 0, 11, 0, 0, 11, 11, 11, 11, 10, 11],
      [11, 11, 0, 0, 0, 0, 11, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 11, 10, 11],
      [11, 0, 0, 0, 6, 0, 11, 0, 0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 3, 11],
      [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    ],
  },
  {
    id: 3,
    startPosition: [96, 288],
    music: SOUND_ID.LEVEL_3,
    map: [
      [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
      [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 0, 5, 0, 0, 0, 0, 0, 13, 6, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 12, 12, 12, 0, 0, 0, 15, 12, 12, 12, 0, 0, 0, 12, 12, 12, 0, 15],
      [15, 0, 0, 12, 12, 12, 0, 0, 12, 12, 12, 15, 0, 0, 12, 12, 12, 0, 0, 15],
      [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 3, 7, 7, 15],
      [15, 12, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 15],
      [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 7, 7, 7, 7, 7, 7, 7, 3, 7, 7, 3, 7, 7, 7, 7, 7, 7, 7, 15],
      [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    ],
  },
];

export default levels;