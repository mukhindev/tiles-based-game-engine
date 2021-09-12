import { GameState } from '../types';
import GameObject from './GameObject';
import Player from './Player';
import World from './World';
import {
  CANVAS_BACKGROUND,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEBUG_DRAW_COLOR,
  GAME_CONFIG,
  SPRITE_WIDTH,
} from '../shared/constants';

export default class View {
  public canvas?: HTMLCanvasElement;
  public ctx?: CanvasRenderingContext2D | null;

  registerCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    // Размеры полотна (экран игры)
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.prepareCanvas();
  }

  // Очистка экрана
  prepareCanvas(): void {
    if (this.canvas && this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = CANVAS_BACKGROUND;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  renderWorld(world: World): void {
    world.levelObjects?.forEach((row: GameObject[], rowIndex) => {
      row.forEach((object, colIndex) => {
        this.ctx?.drawImage(
          object.sprite.image,
          object.spriteFrame * object.spriteWidth,
          0,
          object.spriteWidth,
          object.spriteHeight,
          colIndex * object.width,
          rowIndex * object.height,
          object.width,
          object.height,
        );
      });
    });
  }

  renderPlayer(player: Player) {
    this.ctx?.drawImage(
      // @ts-ignore
      player.sprite.image,
      player.spriteFrame * player.spriteWidth,
      0,
      player.spriteWidth || player.width,
      player.spriteHeight || player.height,
      player.x,
      player.y,
      player.width,
      player.height,
    );

    if (GAME_CONFIG.IS_DEBUG_DRAW) {
      this.renderDebugPlayerHitBox(player);
    }
  }

  renderDebugPlayerHitBox(player: Player): void {
    if (this.ctx) {
      const { top, right, bottom, left } = player.hitBox;

      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = DEBUG_DRAW_COLOR.HIT_BOX;
      this.ctx.strokeRect(left, top, right - left, bottom - top);

      const [px, py] = player.position;

      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = DEBUG_DRAW_COLOR.ON_ABOVE_TILE;
      this.ctx.strokeRect(px * SPRITE_WIDTH, (py + 1) * SPRITE_WIDTH, player.width, player.height);

      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = DEBUG_DRAW_COLOR.ON_OVER_TILE;
      this.ctx.strokeRect(px * SPRITE_WIDTH, py * SPRITE_WIDTH, player.width, player.height);
    }
  }

  update(gameState: GameState): void {
    this.prepareCanvas();
    this.renderWorld(gameState.world);
    this.renderPlayer(gameState.player);
  }
}
