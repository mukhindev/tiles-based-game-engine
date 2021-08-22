import { GameState } from '../types';
import GameObject from './GameObject';
import Player from './Player';
import World from './World';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../shared/constants';

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
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  renderWorld(world: World): void {
    world.levelObjects?.forEach((row: GameObject[], rowIndex) => {
      row.forEach((object, colIndex) => {
        this.ctx?.drawImage(
          object.sprite.image,
          0,
          0,
          object.width,
          object.height,
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
      0,
      0,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height,
    );
  }

  update(gameState: GameState): void {
    this.prepareCanvas();
    this.renderWorld(gameState.world);
    this.renderPlayer(gameState.player);
  }
}
