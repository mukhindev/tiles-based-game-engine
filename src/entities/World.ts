import GameObject from './GameObject';
import Player from './Player';
import { GAME_CONFIG, HIT_BOX_KEY, SPRITE_HEIGHT, SPRITE_WIDTH } from '../shared/constants';
import { GameEntities, Position, PX, PY, XYCoordinates } from '../types';

export default class World {
  public levelObjects: GameObject[][];
  public lastPlayerPosition: Position;
  public lastActionPosition: Position;
  public lastOveredGameObject: GameObject | null;
  public friction: number;
  public gravity: number;
  public startPosition: XYCoordinates;

  constructor() {
    this.levelObjects = [];
    this.startPosition = [0, 0];
    this.lastPlayerPosition = [-1, -1];
    this.lastActionPosition = [-1, -1];
    this.lastOveredGameObject = null;
    this.friction = GAME_CONFIG.FRICTION;
    this.gravity = GAME_CONFIG.GRAVITY;
  }

  setStartPosition(xy: XYCoordinates): void {
    this.startPosition = xy;
  }

  setLevelObjects(levelObjects: GameObject[][]): void {
    this.levelObjects = levelObjects;
  }

  setFriction(value: number): void {
    this.friction = value;
  }

  setGravity(value: number): void {
    this.gravity = value;
  }

  destroy(): void {
    this.levelObjects = [];
    this.lastOveredGameObject = null;
  }

  // Проверка коллизии. p* положение hitbox c коллизией, op* (offset position) без коллизии
  checkCollision = (player: Player, key: string, px: PX, py: PY, opx: PX, opy: PX): void => {
    if (this.levelObjects && this.levelObjects[px][py].hasCollision) {
      player.setHitBox({ [key]: opx * SPRITE_WIDTH });
    } else {
      player.setHitBox({ [key]: opy * SPRITE_HEIGHT });
    }
  };

  resetPhysicsToDefault(): void {
    this.friction = GAME_CONFIG.FRICTION;
    this.gravity = GAME_CONFIG.GRAVITY;
  }

  // Обновление на смену позиции (по тайлам)
  onPositionUpdate(gameEntities: GameEntities, px: PX, py: PY): void {
    const isOver = this.lastActionPosition[0] === px && this.lastActionPosition[1] === py;

    const overedGameObject = this.levelObjects[py][px];
    const bottomGameObject = this.levelObjects[py + 1][px];

    this.resetPhysicsToDefault();

    // Колбэк при пересечении объекта
    if (overedGameObject.onOver) {
      overedGameObject.onOver({ target: overedGameObject, ...gameEntities });
      this.lastActionPosition = [px, py];
    }

    // Колбэк при перемещении по объекту
    if (bottomGameObject.onAbove && !isOver) {
      bottomGameObject.onAbove({ target: bottomGameObject, ...gameEntities });
    }

    // Колбэк при покидании объекта
    if (this.lastOveredGameObject?.onOut) {
      this.lastOveredGameObject.onOut({ target: this.lastOveredGameObject, ...gameEntities });
    }

    this.lastOveredGameObject = overedGameObject;
  }

  checkPositionUpdate = (px: PX, py: PY): boolean => {
    if (this.lastPlayerPosition[0] !== px || this.lastPlayerPosition[1] !== py) {
      this.lastPlayerPosition = [px, py];

      return true;
    }

    return false;
  };

  update(gameEntities: GameEntities): void {
    const { player } = gameEntities;
    const [px, py] = player.position;

    this.checkCollision(player, HIT_BOX_KEY.TOP, py - 1, px, py, py - 1);
    this.checkCollision(player, HIT_BOX_KEY.RIGHT, py, px + 1, px + 1, px + 2);
    this.checkCollision(player, HIT_BOX_KEY.BOTTOM, py + 1, px, py + 1, py + 2);
    this.checkCollision(player, HIT_BOX_KEY.LEFT, py, px - 1, px, px - 1);

    const isUpdated = this.checkPositionUpdate(px, py);

    if (isUpdated) {
      this.onPositionUpdate(gameEntities, px, py);
    }
  }
}
