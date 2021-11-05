import airSprite from './assets/sprites/air.png';
import badBrickSprite from './assets/sprites/bad-brick.png';
import brickSprite from './assets/sprites/brick.png';
import concreteSprite from './assets/sprites/concrete.png';
import doorSprite from './assets/sprites/door.png';
import grassSprite from './assets/sprites/grass.png';
import iceSprite from './assets/sprites/ice.png';
import keySprite from './assets/sprites/key.png';
import metalSprite from './assets/sprites/metal.png';
import metalBlockSprite from './assets/sprites/metal-block.png';
import metalFenceSprite from './assets/sprites/metal-fence.png';
import playerSprite from './assets/sprites/player.png';
import portalASprite from './assets/sprites/portal-a.png';
import portalBSprite from './assets/sprites/portal-b.png';
import spikesSprite from './assets/sprites/spikes.png';
import trampolineSprite from './assets/sprites/trampoline.png';
import woodFenceSprite from './assets/sprites/wood-fence.png';
import { SpriteRegisterOptions } from './types';

export const SPRITE_ID = {
  PLAYER: 'player',
  AIR: 'air',
  BRICK: 'brick',
  BAD_BRICK: 'bad-brick',
  GRASS: 'grass',
  TRAMPOLINE: 'trampoline',
  ICE: 'ice',
  KEY: 'key',
  DOOR: 'door',
  SPIKES: 'spikes',
  PORTAL_A: 'portal-a',
  PORTAL_B: 'portal-b',
  METAL: 'metal',
  METAL_BLOCK: 'metal-block',
  METAL_FENCE: 'metalFence',
  WOOD_FENCE: 'woodFence',
  CONCRETE: 'concrete',
} as const;

export const sprites: SpriteRegisterOptions[] = [
  { id: SPRITE_ID.PLAYER, src: playerSprite },
  { id: SPRITE_ID.BRICK, src: brickSprite },
  { id: SPRITE_ID.BAD_BRICK, src: badBrickSprite },
  { id: SPRITE_ID.AIR, src: airSprite },
  { id: SPRITE_ID.GRASS, src: grassSprite },
  { id: SPRITE_ID.TRAMPOLINE, src: trampolineSprite },
  { id: SPRITE_ID.ICE, src: iceSprite },
  { id: SPRITE_ID.KEY, src: keySprite },
  { id: SPRITE_ID.DOOR, src: doorSprite },
  { id: SPRITE_ID.SPIKES, src: spikesSprite },
  { id: SPRITE_ID.PORTAL_A, src: portalASprite },
  { id: SPRITE_ID.PORTAL_B, src: portalBSprite },
  { id: SPRITE_ID.METAL, src: metalSprite },
  { id: SPRITE_ID.METAL_FENCE, src: metalFenceSprite },
  { id: SPRITE_ID.WOOD_FENCE, src: woodFenceSprite },
  { id: SPRITE_ID.CONCRETE, src: concreteSprite },
  { id: SPRITE_ID.METAL_BLOCK, src: metalBlockSprite },
];
