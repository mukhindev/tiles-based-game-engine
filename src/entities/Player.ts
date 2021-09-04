import Sprite from './Sprite';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GAME_CONFIG,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
} from '../shared/constants';
import {
  GameState,
  Width,
  Height,
  X,
  Y,
  VX,
  VY,
  HitBox,
  Position,
} from '../types';

export default class Player {
  public x: X;
  public y: Y;
  public width: Width;
  public height: Height;
  public speed: number;
  public jumpPower: number;
  public isJumping: boolean;
  public vx: VX;
  public vy: VY;
  public sprite?: Sprite;
  public hitBox: HitBox;
  public default: {
    x: X;
    y: Y;
    width: Width;
    height: Height;
    speed: number;
    jumpPower: number;
  };

  constructor() {
    // Стартовые координаты персонажа
    this.x = 0;
    this.y = 0;

    this.width = SPRITE_WIDTH;
    this.height = SPRITE_HEIGHT;

    this.speed = GAME_CONFIG.PLAYER_SPEED;
    this.jumpPower = GAME_CONFIG.PLAYER_JUMP_POWER;

    // Векторная скорость персонажа
    this.vx = 0;
    this.vy = 0;

    this.isJumping = false;

    this.hitBox = {
      top: 0,
      right: CANVAS_WIDTH,
      bottom: CANVAS_HEIGHT,
      left: 0,
    };

    this.default = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      speed: this.speed,
      jumpPower: this.jumpPower,
    };
  }

  restoreDefault() {
    Object.entries(this.default)
      .forEach(([key, value]) => {
        // @ts-ignore
        this[key] = value;
      });
  }

  init({ world }: GameState) {
    const { startPosition: [x, y] } = world;

    this.x = x;
    this.y = y;
    this.default.x = x;
    this.default.y = y;
  }

  get position(): Position {
    const px = Math.round(this.x / this.width);
    const py = Math.round(this.y / this.height);

    return [px, py];
  }

  setHitBox({ top, right, bottom, left }: Partial<HitBox>): void {
    this.hitBox = {
      ...this.hitBox,
      top: top || this.hitBox.top,
      right: right || this.hitBox.right,
      bottom: bottom || this.hitBox.bottom,
      left: left || this.hitBox.left,
    };
  }

  update({ control, world }: GameState) {
    const { left, right, space } = control.keys;

    // Движение влево
    if (left) {
      if (this.vx > -this.speed) {
        this.vx -= 1;
      }
    }

    // Движение вправо
    if (right) {
      if (this.vx < this.speed) {
        this.vx += 1;
      }
    }

    // Прыжок
    if (space) {
      if (!this.isJumping) {
        this.isJumping = true;
        this.vy = -this.speed * this.jumpPower;
      }
    }

    // Воздействие физики мира на игрока
    const { friction, gravity } = world;

    this.vx *= friction;
    this.vy += gravity;

    // Перемещение
    this.x += this.vx;
    this.y += this.vy;

    // Коллизия слева и справа
    if (this.x >= this.hitBox.right - this.width) {
      this.x = this.hitBox.right - this.width;
      this.vx = 0;
    } else if (this.x <= this.hitBox.left) {
      this.x = this.hitBox.left;
      this.vx = 0;
    }

    // Коллизия сверху и снизу
    if (this.y >= this.hitBox.bottom - this.height) {
      this.y = this.hitBox.bottom - this.height;
      this.isJumping = false;
      this.vy = 0;
    } else if (this.y <= this.hitBox.top) {
      this.y = this.hitBox.top;
      this.vy = 0;
    }
  }
}
