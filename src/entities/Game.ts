import Control from './Control';
import View from './View';
import Sprite from './Sprite';
import World from './World';
import { GameObjectRegisterOptions, GameState, LevelRegisterOptions, SpriteRegisterOptions } from '../types';
import GameObject from './GameObject';
import Player from './Player';
import { SPRITE_ID } from '../sprites';

export default class Game {
  public registeredSprites: SpriteRegisterOptions[];
  public registeredGameObjects: GameObjectRegisterOptions[];
  public registeredLevels: LevelRegisterOptions[];
  public sprites: Record<number | string, Sprite>;
  public gameObjectConstructors: Record<number | string, GameObjectRegisterOptions>;
  public world: World;
  public control: Control;
  public player: Player;
  public view: View;

  public isLoaded: boolean;
  private requestAnimationId: number;

  constructor() {
    // Зарегистрированные в игре сущности
    this.registeredSprites = [];
    this.registeredGameObjects = [];
    this.registeredLevels = [];

    this.sprites = {};
    this.gameObjectConstructors = {};

    this.control = new Control();
    this.world = new World();
    this.player = new Player();
    this.view = new View();

    this.isLoaded = false;
    this.requestAnimationId = 0;

    this.loop = this.loop.bind(this);
  }

  // Регистрация спрайтов в игре (см. index.ts)
  public registerSprites(sprites: SpriteRegisterOptions[]) {
    this.registeredSprites = sprites;
  }

  // Регистрация игровых объектов в игре (см. index.ts)
  public registerGameObjects(gameObjects: GameObjectRegisterOptions[]) {
    this.registeredGameObjects = gameObjects;
  }

  // Регистрация спрайтов в игре (см. index.ts)
  public registerLevels(levels: LevelRegisterOptions[]) {
    this.registeredLevels = levels;
  }

  private prepareSprite = (sprite: Sprite) => {
    if (this.sprites[sprite.id]) {
      throw Error('Идентификатор спрайтов должен быть уникальным');
    }

    this.sprites[sprite.id] = sprite;
  };

  // Регистрация спрайтов
  private async prepareSprites() {
    const sprites = this.registeredSprites.map((options) => new Sprite(options));
    sprites.forEach(this.prepareSprite);

    // Загрузка спрайтов асинхронна, ожидаем загрузку всех
    const loads = sprites.map((sprite) => sprite.load());
    await Promise.all(loads);
    this.isLoaded = true;
  }

  // Регистрация игровых объектов (регистрируются конструкторы, создаются в World)
  private prepareGameObject = (gameObject: GameObjectRegisterOptions) => {
    if (this.gameObjectConstructors[gameObject.id]) {
      throw Error('Идентификатор игровых объектов должен быть уникальным');
    }
    this.gameObjectConstructors[gameObject.id] = gameObject;
  };

  private prepareGameObjects() {
    this.registeredGameObjects.forEach(this.prepareGameObject);
    return this.gameObjectConstructors;
  }

  private prepareLevel() {
    const currentRegisterLevel = this.registeredLevels[0];

    // Установка в мир стартовой позиции игрока
    this.world.setStartPosition(currentRegisterLevel.startPosition);

    // Создание игровых объектов
    const levelObjects = currentRegisterLevel.map.map((row) => {
      return row.map((objectId) => {
        if (!this.gameObjectConstructors[objectId]) {
          throw Error(`Ошибка создания уровня. Игровой блок "${objectId}" не зарегистрирован`);
        }

        const { spriteId } = this.gameObjectConstructors[objectId];

        if (!this.sprites[spriteId]) {
          throw Error(`Ошибка создания уровня. Спрайт "${spriteId}" не зарегистрирован`);
        }

        return new GameObject({
          ...this.gameObjectConstructors[objectId],
          sprite: this.sprites[spriteId],
        });
      });
    });

    // Установка в мир игровых объектов
    this.world.setLevelObjects(levelObjects);
  }

  private preparePlayer() {
    this.player.sprite = this.sprites[SPRITE_ID.PLAYER];
    this.player.spriteWidth = 64;
    this.player.spriteHeight = 64;
  }

  async init(callback?: () => void): Promise<void> {
    this.control.init();
    await this.prepareSprites();
    this.prepareGameObjects();
    this.prepareLevel();
    this.preparePlayer();
    this.player.init(this.gameState);
    this.start();

    if (callback) {
      callback();
    }
  }

  start(): void {
    this.loop();
  }

  stop(): void {
    window.cancelAnimationFrame(this.requestAnimationId);
  }

  get gameState(): GameState {
    return {
      gameObjects: this.gameObjectConstructors,
      control: this.control,
      world: this.world,
      player: this.player,
      view: this.view,
      isLoaded: this.isLoaded,
    };
  }

  loop(): void {
    this.world.update(this.gameState);
    this.player.update(this.gameState);
    this.view.update(this.gameState);

    this.requestAnimationId = window.requestAnimationFrame(this.loop);
  }

  reset(): void {
    this.player.restoreDefault();
  }

  destroy(): void {
    this.control.destroy();
  }
}
