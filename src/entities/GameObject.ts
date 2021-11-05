import Sprite from './Sprite';
import { GameObjectCallbackParams, Height, Width, X, Y } from '../types';

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
  onOver?: (params: GameObjectCallbackParams) => void;
  onOut?: (params: GameObjectCallbackParams) => void;
  onAbove?: (params: GameObjectCallbackParams) => void;
};

export default class GameObject {
  public id: number | string;
  public x: X;
  public y: Y;
  public width: Width;
  public height: Height;
  public sprite: Sprite;
  public spriteFrame: number;
  public spriteWidth: Width;
  public spriteHeight: Height;
  public hasCollision: boolean;
  public z: number;
  public onOver?: (params: GameObjectCallbackParams) => void;
  public onOut?: (params: GameObjectCallbackParams) => void;
  public onAbove?: (params: GameObjectCallbackParams) => void;

  constructor(options: GameObjectConstructorOptions) {
    this.id = options.id;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.sprite = options.sprite;
    this.spriteFrame = 0;
    this.spriteWidth = options.spriteWidth || options.width;
    this.spriteHeight = options.spriteHeight || options.height;
    this.hasCollision = options.hasCollision ?? false;
    this.z = options.z ?? 0;
    this.onOver = options.onOver;
    this.onOut = options.onOut;
    this.onAbove = options.onAbove;
  }

  resetOnOverCallback(): void {
    this.onOver = undefined;
  }

  resetOnOutCallback(): void {
    this.onOut = undefined;
  }

  resetOnAboveCallback(): void {
    this.onAbove = undefined;
  }

  deactivate(): void {
    this.resetOnAboveCallback();
    this.resetOnOutCallback();
    this.resetOnOverCallback();
  }

  setSpriteFrame(frame: number): void {
    this.spriteFrame = frame;
  }

  setCollision(value?: boolean): void {
    this.hasCollision = value ?? true;
  }

  hideAndDeactivate(): void {
    // "Прозрачный" спрайт
    this.setSpriteFrame(-1);
    this.deactivate();
  }
}
