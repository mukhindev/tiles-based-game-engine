import { GameState, XYCoordinates } from '../types';
import GameObject from './GameObject';
import { GAME_CONFIG } from '../shared/constants';

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

  update({ player }: GameState): void {
    const [px, py] = player.position;

    // Блок под персонажем
    // console.log(this.levelObjects[py][px]);
  }
}
