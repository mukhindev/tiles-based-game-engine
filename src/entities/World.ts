import { GameState, PX, PY, XYCoordinates } from '../types';
import GameObject from './GameObject';
import { GAME_CONFIG, HIT_BOX_KEY, SPRITE_HEIGHT, SPRITE_WIDTH } from '../shared/constants';
import Player from './Player';

export default class World {
  public levelObjects?: GameObject[][];
  public friction: number;
  public gravity: number;
  public startPosition: XYCoordinates;

  constructor() {
    this.levelObjects = [];
    this.startPosition = [0, 0];
    this.friction = GAME_CONFIG.FRICTION;
    this.gravity = GAME_CONFIG.GRAVITY;
  }

  setStartPosition(xy: XYCoordinates) {
    this.startPosition = xy;
  }

  setLevelObjects(levelObjects: GameObject[][]): void {
    this.levelObjects = levelObjects;
  }

  destroy(): void {
    this.levelObjects = [];
  }

  /**
   * Проверка коллизии
   * @param player Экземпляр плеера
   * @param key Ключ направления hitbox
   * @param px hitbox по x если в соответствующую сторону коллизия
   * @param py hitbox по y если в соответствующую сторону коллизия
   * @param opx hitbox по x если в соответствующую сторону нет коллизии
   * @param opy hitbox по y если в соответствующую сторону нет коллизии
   */
  checkCollision = (player: Player, key: string, px: PX, py: PY, opx: PX, opy: PX): void => {
    if (this.levelObjects && this.levelObjects[px][py].hasCollision) {
      player.setHitBox({ [key]: opx * SPRITE_WIDTH });
    } else {
      player.setHitBox({ [key]: opy * SPRITE_HEIGHT });
    }
  };

  update({ player }: GameState): void {
    const [px, py] = player.position;

    this.checkCollision(player, HIT_BOX_KEY.TOP, py - 1, px, py, py - 1);
    this.checkCollision(player, HIT_BOX_KEY.RIGHT, py, px + 1, px + 1, px + 2);
    this.checkCollision(player, HIT_BOX_KEY.BOTTOM, py + 1, px, py + 1, py + 2);
    this.checkCollision(player, HIT_BOX_KEY.LEFT, py, px - 1, px, px - 1);
  }
}
