import Control from './Control';
import GameObject from './GameObject';
import Player from './Player';
import SoundController from './SoundController';
import SoundSample from './SoundSample';
import Sprite from './Sprite';
import View from './View';
import World from './World';
import {
  GAME_CONFIG,
  GAME_SESSION_KEY,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
} from '../shared/constants';

import text from '../shared/text';

import { SPRITE_ID } from '../sprites';
import {
  GameEntities,
  GameObjectRegisterOptions,
  GameState,
  LevelRegisterOptions,
  SoundRegisterOptions,
  SpriteRegisterOptions,
} from '../types';

export default class Game {
  public registeredSprites: SpriteRegisterOptions[];
  public registeredSounds: SoundRegisterOptions[];
  public registeredGameObjects: GameObjectRegisterOptions[];
  public registeredLevels: LevelRegisterOptions[];
  public sprites: Record<number | string, Sprite>;
  public sounds: Record<number | string, SoundSample>;
  public gameObjectOptions: Record<number | string, GameObjectRegisterOptions>;
  public world: World;
  public control: Control;
  public player: Player;
  public view: View;
  public sound: SoundController;
  public isLoaded: boolean;
  private requestAnimationId: number;
  public gameState: GameState;
  public onStateUpdate: (gameSession: GameState) => void;

  private _gameStartTimestamp!: number;

  private _defaultGameState = {
    isKeyAcquired: false,
    isDoorUnlocked: false,
    isGameCompleted: false,
    playerHealth: 3,
    time: 0,
    totalTime: 0,
    level: 1,
    points: 0,
  } as GameState;

  constructor() {
    this.registeredSprites = [];
    this.registeredSounds = [];
    this.registeredGameObjects = [];
    this.registeredLevels = [];

    this.sprites = {};
    this.sounds = {};
    this.gameObjectOptions = {};

    this.control = new Control();
    this.world = new World();
    this.player = new Player();
    this.view = new View();
    this.sound = new SoundController();

    this.isLoaded = false;
    this.requestAnimationId = 0;

    this.gameState = { ...this._defaultGameState };

    this.onStateUpdate = () => undefined;

    this.loop = this.loop.bind(this);
    this.setGameState = this.setGameState.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
  }

  public registerSprites(sprites: SpriteRegisterOptions[]): void {
    this.registeredSprites = sprites;
  }

  public registerSounds(sounds: SoundRegisterOptions[]): void {
    this.registeredSounds = sounds;
  }

  public registerGameObjects(gameObjects: GameObjectRegisterOptions[]): void {
    this.registeredGameObjects = gameObjects;
  }

  public registerLevels(levels: LevelRegisterOptions[]): void {
    this.registeredLevels = levels;
  }

  private prepareSprite = (sprite: Sprite) => {
    if (this.sprites[sprite.id]) {
      throw Error(text.game.errors.uniqueSprite);
    }

    this.sprites[sprite.id] = sprite;
  };

  private async prepareSprites() {
    const sprites = this.registeredSprites.map((options) => new Sprite(options));

    sprites.forEach(this.prepareSprite);

    await Promise.all(sprites.map((sprite) => sprite.load()));
    this.isLoaded = true;
  }

  private prepareSound = (sound: SoundSample): void => {
    if (this.sounds[sound.id]) {
      throw Error(text.game.errors.loadingSound);
    }

    this.sound?.add(sound);
  };

  private async prepareSounds() {
    const sounds = this.registeredSounds.map((options) => new SoundSample(options));

    await Promise.all(sounds.map((sound) => sound.load()));
    sounds.forEach(this.prepareSound);
    this.isLoaded = true;
  }

  private prepareGameObject = (gameObject: GameObjectRegisterOptions) => {
    if (this.gameObjectOptions[gameObject.id]) {
      throw Error(text.game.errors.loadingGameObject);
    }

    this.gameObjectOptions[gameObject.id] = gameObject;
  };

  private prepareGameObjects() {
    this.registeredGameObjects.forEach(this.prepareGameObject);

    return this.gameObjectOptions;
  }

  private prepareLevel(levelNumber: number) {
    const levelIndex = levelNumber - 1;
    const currentRegisterLevel = this.registeredLevels[levelIndex];

    this.sound?.play(currentRegisterLevel.music);

    this.world.setStartPosition(currentRegisterLevel.startPosition);

    const levelObjects = currentRegisterLevel.map.map((row, rowIndex) => {
      return row.map((objectId, colIndex) => {
        if (!this.gameObjectOptions[objectId]) {
          throw Error(`${text.game.errors.unregisteredGameObject} "${objectId}"`);
        }

        const { spriteId } = this.gameObjectOptions[objectId];

        if (!this.sprites[spriteId]) {
          throw Error(`${text.game.errors.unregisteredSprite} "${spriteId}"`);
        }

        return new GameObject({
          ...this.gameObjectOptions[objectId],
          sprite: this.sprites[spriteId],
          x: colIndex * SPRITE_WIDTH,
          y: rowIndex * SPRITE_HEIGHT,
        });
      });
    });

    this.world.setLevelObjects(levelObjects);
  }

  private preparePlayer() {
    this.player.sprite = this.sprites[SPRITE_ID.PLAYER];
    this.player.spriteWidth = 64;
    this.player.spriteHeight = 64;
  }

  async init(callback?: (gameEntities: GameEntities) => void): Promise<void> {
    this.sound.init();
    await this.prepareSprites();
    await this.prepareSounds();
    this.start();

    if (callback) {
      callback(this.gameEntities);
    }
  }

  private _resetGameState(): void {
    this.gameState = { ...this._defaultGameState };
  }

  setGameState<T extends keyof GameState, K extends GameState[T]>(key: T, value: K): void {
    this.gameState[key] = value;

    if (this.onStateUpdate) {
      this.onStateUpdate({ ...this.gameState });
    }
  }

  nextLevel(levelNumber?: number): void {
    const nextLevelNumber = levelNumber || this.gameState.level + 1;
    const hasNextLevel = nextLevelNumber <= this.registeredLevels.length;

    const totalTime = this.gameState.totalTime + this.gameState.time;
    const timeBonus = GAME_CONFIG.MAX_TIME_BONUS_POINTS - this.gameState.time;
    const timeBonusPoints = timeBonus > 0 ? timeBonus : 0;
    const points = this.gameState.points + GAME_CONFIG.LEVEL_POINTS + timeBonusPoints;

    if (!hasNextLevel) {
      this.setGameState(GAME_SESSION_KEY.TOTAL_TIME, totalTime);
      this.setGameState(GAME_SESSION_KEY.POINTS, points);
      this.setGameState(GAME_SESSION_KEY.IS_GAME_COMPLETED, true);

      return;
    }

    this.stop();
    this.setGameState(GAME_SESSION_KEY.TOTAL_TIME, totalTime);
    this.setGameState(GAME_SESSION_KEY.POINTS, points);
    this.setGameState(GAME_SESSION_KEY.LEVEL, nextLevelNumber);
    this.proceed();
  }

  get gameEntities(): GameEntities {
    return {
      gameObjects: this.gameObjectOptions,
      control: this.control,
      world: this.world,
      player: this.player,
      view: this.view,
      sound: this.sound,
      isLoaded: this.isLoaded,
      gameState: this.gameState,
      setGameState: this.setGameState,
      nextLevel: this.nextLevel,
    };
  }

  loop(): void {
    this.world.update(this.gameEntities);
    this.player.update(this.gameEntities);
    this.view.update(this.gameEntities);
    this.control.update();

    this.requestAnimationId = window.requestAnimationFrame(this.loop);

    const elapsedTime = Date.now() - this._gameStartTimestamp;

    if (
      !this.gameState[GAME_SESSION_KEY.IS_DOOR_UNLOCKED]
      && elapsedTime - this.gameState.time >= 1000
    ) {
      this.setGameState(GAME_SESSION_KEY.TIME, elapsedTime);
    }
  }

  resetGameObjects(): void {
    this.gameObjectOptions = {};
    this.prepareGameObjects();
  }

  start(): void {
    this.resetGameObjects();
    this.prepareLevel(this.gameState.level);
    this.preparePlayer();
    this.player.init(this.gameEntities);
    this.control.init();
    this._gameStartTimestamp = Date.now();
    this.loop();
  }

  proceed(): void {
    this.player.restoreDefault();
    this.world.destroy();
    this.start();
  }

  stop(): void {
    this.control.destroy();
    this.sound.stop(this.registeredLevels[this.gameState.level - 1].music);
    this._resetGameState();

    window.cancelAnimationFrame(this.requestAnimationId);
  }
}
