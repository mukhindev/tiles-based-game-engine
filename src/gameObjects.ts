import { GAME_SESSION_KEY } from './shared/constants';
import makeAnimation from './shared/makeAnimation';
import { SOUND_ID } from './sounds';
import { SPRITE_ID } from './sprites';
import { GameObjectRegisterOptions } from './types';
import GameObject from './entities/GameObject';

export const GAME_OBJECT_ID = {
  AIR: 0,
  BRICK: 1,
  GRASS: 2,
  TRAMPOLINE: 3,
  ICE: 4,
  KEY: 5,
  DOOR: 6,
  SPIKES: 7,
  PORTAL_A: 8,
  PORTAL_B: 9,
  BAD_BRICK: 10,
  CONCRETE: 11,
  METAL: 12,
  METAL_FENCE: 13,
  WOOD_FENCE: 14,
  METAL_BLOCK: 15,
} as const;

export const gameObjects: GameObjectRegisterOptions[] = [
  {
    id: GAME_OBJECT_ID.AIR,
    spriteId: SPRITE_ID.AIR,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
  },
  {
    id: GAME_OBJECT_ID.BRICK,
    spriteId: SPRITE_ID.BRICK,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
  },
  {
    id: GAME_OBJECT_ID.GRASS,
    spriteId: SPRITE_ID.GRASS,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target }): void => {
      target.setSpriteFrame(1);
    },
    onOut: ({ target }): void => {
      target.setSpriteFrame(0);
    },
  },
  {
    id: GAME_OBJECT_ID.TRAMPOLINE,
    spriteId: SPRITE_ID.TRAMPOLINE,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target, player, sound }): void => {
      player.setVelocityY(-10);
      sound.play(SOUND_ID.TRAMPOLINE);
      makeAnimation((frame) => target.setSpriteFrame(frame), [0, 1, 2, 1, 0]);
    },
  },
  {
    id: GAME_OBJECT_ID.ICE,
    spriteId: SPRITE_ID.ICE,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
    onAbove: ({ world }): void => {
      world.setFriction(0.99);
    },
  },
  {
    id: GAME_OBJECT_ID.KEY,
    spriteId: SPRITE_ID.KEY,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target, sound, setGameState }): void => {
      target.hideAndDeactivate();
      setGameState(GAME_SESSION_KEY.IS_KEY_ACQUIRED, true);
      sound.play(SOUND_ID.KEY);
    },
  },
  {
    id: GAME_OBJECT_ID.DOOR,
    spriteId: SPRITE_ID.DOOR,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: (params): void => {
      const { target, sound, gameState, setGameState, nextLevel } = params;

      if (gameState.isKeyAcquired) {
        setGameState(GAME_SESSION_KEY.IS_DOOR_UNLOCKED, true);
        target.setSpriteFrame(1);
        target.deactivate();
        sound.play(SOUND_ID.DOOR);

        setTimeout(() => {
          nextLevel();
        }, 1000);
      }
    },
  },
  {
    id: GAME_OBJECT_ID.SPIKES,
    spriteId: SPRITE_ID.SPIKES,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: (params): void => {
      const { player, sound, gameState, setGameState } = params;

      setGameState(GAME_SESSION_KEY.PLAYER_HEALTH, gameState.playerHealth - 1);
      player.setVelocityY(-2);

      if (player.vx > 0) {
        player.setVelocityX(-10);
      } else {
        player.setVelocityX(10);
      }

      sound.play(SOUND_ID.SPIKES);
    },
  },
  {
    id: GAME_OBJECT_ID.PORTAL_A,
    spriteId: SPRITE_ID.PORTAL_A,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ player, world, sound }): void => {
      const otherPortal = world.levelObjects
        .flat()
        .find((object: GameObject) => object.id === GAME_OBJECT_ID.PORTAL_B);

      if (otherPortal && otherPortal.x && otherPortal.y) {
        player.setX(otherPortal.x);
        player.setY(otherPortal.y);
        sound.play(SOUND_ID.TELEPORT);
      }
    },
  },
  {
    id: GAME_OBJECT_ID.PORTAL_B,
    spriteId: SPRITE_ID.PORTAL_B,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
  },
  {
    id: GAME_OBJECT_ID.BAD_BRICK,
    spriteId: SPRITE_ID.BAD_BRICK,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
    onAbove: ({ target, sound }): void => {
      sound.play(SOUND_ID.BAD_BRICK);
      makeAnimation((frame) => target.setSpriteFrame(frame), [0, 1, 2, 3], 1000 / 10);
      target.setCollision(false);
      target.deactivate();
    },
  },
  {
    id: GAME_OBJECT_ID.CONCRETE,
    spriteId: SPRITE_ID.CONCRETE,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
  },
  {
    id: GAME_OBJECT_ID.METAL,
    spriteId: SPRITE_ID.METAL,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
  },
  {
    id: GAME_OBJECT_ID.METAL_FENCE,
    spriteId: SPRITE_ID.METAL_FENCE,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
  },
  {
    id: GAME_OBJECT_ID.WOOD_FENCE,
    spriteId: SPRITE_ID.WOOD_FENCE,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
  },
  {
    id: GAME_OBJECT_ID.METAL_BLOCK,
    spriteId: SPRITE_ID.METAL_BLOCK,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
  },
];
