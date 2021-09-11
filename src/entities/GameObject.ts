import Sprite from './Sprite';
import { Height, Width, X, Y } from '../types';

export type GameObjectConstructorOptions = {
  id: number | string;
  sprite: Sprite;
  x?: X;
  y?: Y;
  width: Width;
  height: Height;
  spriteWidth?: Width;
  spriteHeight?: Height;
  hasCollision?: boolean;
  z?: number;
};

export default class GameObject {
  public id: number | string;
  public x: X;
  public y: Y;
  public width: Width;
  public height: Height;
  public sprite: Sprite;
  public spriteWidth: Width;
  public spriteHeight: Height;
  public hasCollision: boolean;
  public z: number;

  constructor(options: GameObjectConstructorOptions) {
    this.id = options.id;
    this.x = 0;
    this.y = 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.sprite = options.sprite;
    this.spriteWidth = options.spriteWidth || options.width;
    this.spriteHeight = options.spriteHeight || options.height;
    this.hasCollision = options.hasCollision ?? false;
    this.z = options.z ?? 0;
  }
}
