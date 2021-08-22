import Sprite from './Sprite';
import { Height, Width, X, Y } from '../types';

export type GameObjectConstructorOptions = {
  id: number | string;
  name: string;
  sprite: Sprite;
  x?: X;
  y?: Y;
  width: Width;
  height: Height;
  hasCollision?: boolean;
  z?: number;
};

export default class GameObject {
  public id: number | string;
  public name: string;
  public x: X;
  public y: Y;
  public width: Width;
  public height: Height;
  public sprite: Sprite;
  public hasCollision: boolean;
  public z: number;

  constructor(options: GameObjectConstructorOptions) {
    this.id = options.id;
    this.name = options.name;
    this.x = 0;
    this.y = 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.sprite = options.sprite;
    this.hasCollision = options.hasCollision ?? false;
    this.z = options.z ?? 0;
  }
}
