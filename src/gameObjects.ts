import { GameObjectRegisterOptions } from './types';
import { SPRITE_ID } from './sprites';

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
    onOver: ({ target }) => {
      target.setSpriteFrame(1);
    },
    onOut: ({ target }) => {
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
    hasCollision: true,
    onAbove: ({ player }) => {
      player.vy = -10;
      // this.soundController.play(SOUND.TRAMPOLINE);
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
    onAbove: ({ world }) => {
      world.friction = 0.99;
    },
  },
  {
    id: GAME_OBJECT_ID.KEY,
    spriteId: SPRITE_ID.KEY,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target }) => {
      target.hideAndDeactivate();
      // this.setGameState(GAME_STATE_KEY.IS_DOOR_UNLOCKED, true);
      // this.soundController.play(SOUND.KEY);
    },
  },
  {
    id: GAME_OBJECT_ID.DOOR,
    spriteId: SPRITE_ID.DOOR,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target }) => {
      // if (this.gameState.isKeyAcquired) {
      //   target.setSprite([32, 96]);
      //   target.deactivate();
      //   this.soundController.play(SOUND.DOOR);
      //   this.stop();
      //
      //   setTimeout(() => {
      //     this.setGameState(GAME_STATE_KEY.IS_LEVEL_COMPLETED, true);
      //   }, 2000);
      // }
    },
  },
  {
    id: GAME_OBJECT_ID.SPIKES,
    spriteId: SPRITE_ID.SPIKES,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ player }) => {
      // this.setGameState(GAME_STATE_KEY.PLAYER_HEALTH, this.gameState.playerHealth - 1);
      player.setVelocityY(-2);

      if (player.vx > 0) {
        player.setVelocityX(-10);
      } else {
        player.setVelocityX(10);
      }

      // this.soundController.play(SOUND.SPIKES);
    },
  },
  {
    id: GAME_OBJECT_ID.PORTAL_A,
    spriteId: SPRITE_ID.PORTAL_A,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ player, world }) => {
      const otherPortal = world.levelObjects
        .flat()
        .find((object) => object.id === GAME_OBJECT_ID.PORTAL_B);

      if (otherPortal && otherPortal.x && otherPortal.y) {
        player.setX(otherPortal.x);
        player.setY(otherPortal.y);
      }
      // this.soundController.play(SOUND.TELEPORT);
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
];
