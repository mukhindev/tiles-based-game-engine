import Sprite from './Sprite';

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GAME_CONFIG,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
} from '../shared/constants';

import {
  GameEntities,
  Height,
  HitBox,
  Position,
  VX,
  VY,
  Width,
  X,
  Y,
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
  public spriteFrame: number;
  public spriteWidth: Width;
  public spriteHeight: Height;
  public hitBox: HitBox;
  public default: {
    x: X;
    y: Y;
    vx: VX;
    vy: VY;
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
      vx: this.vx,
      vy: this.vy,
      width: this.width,
      height: this.height,
      speed: this.speed,
      jumpPower: this.jumpPower,
    };

    this.spriteWidth = 0;
    this.spriteHeight = 0;
    this.spriteFrame = 0;
  }

  restoreDefault(): void {
    this.deactivateHitBoxForNextFrame();

    this.x = this.default.x;
    this.y = this.default.y;
    this.vx = this.default.vx;
    this.vy = this.default.vy;
    this.width = this.default.width;
    this.height = this.default.height;
    this.speed = this.default.speed;
    this.jumpPower = this.default.jumpPower;
  }

  init({ world }: GameEntities): void {
    const { startPosition: [x, y] } = world;

    this.x = x;
    this.y = y;
    this.default.x = x;
    this.default.y = y;
  }

  setSpriteFrame(frame: number): void {
    this.spriteFrame = frame;
  }

  get position(): Position {
    const px = Math.round(this.x / this.width);
    const py = Math.round(this.y / this.height);

    return [px, py];
  }

  setX(x: X): void {
    this.deactivateHitBoxForNextFrame();
    this.x = x;
  }

  setY(y: Y): void {
    this.deactivateHitBoxForNextFrame();
    this.y = y;
  }

  setVelocityX(vx: VX): void {
    this.vx = vx;
  }

  setVelocityY(vy: VY): void {
    this.vy = vy;
  }

  addVelocityX(vx: VX): void {
    this.vx += vx;
  }

  addVelocityY(vy: VY): void {
    this.vy += vy;
  }

  setHitBox(sides: Partial<HitBox>): void {
    const { top, right, bottom, left } = sides;

    this.hitBox = {
      ...this.hitBox,
      top: top || this.hitBox.top,
      right: right || this.hitBox.right,
      bottom: bottom || this.hitBox.bottom,
      left: left || this.hitBox.left,
    };
  }

  deactivateHitBoxForNextFrame(): void {
    this.hitBox = {
      top: 0,
      right: CANVAS_WIDTH,
      bottom: CANVAS_HEIGHT,
      left: 0,
    };
  }

  update({ control, world }: GameEntities): void {
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
      if (!this.isJumping && this.vy === 0) {
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

    // Поиск коллизии слева и справа
    const isLeftCollision = this.x >= this.hitBox.right - this.width;
    const isRightCollision = this.x <= this.hitBox.left;
    const isBottomCollision = this.y >= this.hitBox.bottom - this.height;
    const isTopCollision = this.y <= this.hitBox.top;

    if (isLeftCollision) {
      this.x = this.hitBox.right - this.width;
      this.vx = 0;
    } else if (isRightCollision) {
      this.x = this.hitBox.left;
      this.vx = 0;
    }

    if (isBottomCollision) {
      this.y = this.hitBox.bottom - this.height;
      this.isJumping = false;
      this.vy = 0;
    } else if (isTopCollision) {
      this.y = this.hitBox.top;
      this.vy = 0;
    }

    // Спрайт при движении
    if (this.vx > GAME_CONFIG.PLAYER_MOVEMENT_SPITE_SENSITIVITY) {
      this.setSpriteFrame(1);
    } else if (this.vx < -GAME_CONFIG.PLAYER_MOVEMENT_SPITE_SENSITIVITY) {
      this.setSpriteFrame(2);
    } else {
      this.setSpriteFrame(0);
    }
  }
}
