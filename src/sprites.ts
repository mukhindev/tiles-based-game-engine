import airSprite from './sprites/air.png';
import playerSprite from './sprites/player.png';
import brickSprite from './sprites/brick.png';
import grassSprite from './sprites/grass.png';
import trampolineSprite from './sprites/trampoline.png';
import iceSprite from './sprites/ice.png';
import keySprite from './sprites/key.png';
import doorSprite from './sprites/door.png';
import spikesSprite from './sprites/spikes.png';
import portalASprite from './sprites/portal-a.png';
import portalBSprite from './sprites/portal-b.png';
import { SpriteRegisterOptions } from './types';

export const SPRITE_ID = {
  PLAYER: 'player',
  AIR: 'air',
  BRICK: 'brick',
  GRASS: 'grass',
  TRAMPOLINE: 'trampoline',
  ICE: 'ice',
  KEY: 'key',
  DOOR: 'door',
  SPIKES: 'spikes',
  PORTAL_A: 'portal-a',
  PORTAL_B: 'portal-b',
} as const;

export const sprites: SpriteRegisterOptions[] = [
  { id: SPRITE_ID.PLAYER, src: playerSprite },
  { id: SPRITE_ID.BRICK, src: brickSprite },
  { id: SPRITE_ID.AIR, src: airSprite },
  { id: SPRITE_ID.GRASS, src: grassSprite },
  { id: SPRITE_ID.TRAMPOLINE, src: trampolineSprite },
  { id: SPRITE_ID.ICE, src: iceSprite },
  { id: SPRITE_ID.KEY, src: keySprite },
  { id: SPRITE_ID.DOOR, src: doorSprite },
  { id: SPRITE_ID.SPIKES, src: spikesSprite },
  { id: SPRITE_ID.PORTAL_A, src: portalASprite },
  { id: SPRITE_ID.PORTAL_B, src: portalBSprite },
];
