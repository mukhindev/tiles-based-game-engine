export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;
export const CANVAS_BACKGROUND = '#000';
export const SPRITE_WIDTH = 32;
export const SPRITE_HEIGHT = 32;

export const CONTROL_KEY = {
  LEFT: 'left',
  RIGHT: 'right',
  SPACE: 'space',
  R: 'r',
} as const;

// Настройки баланса игры
export const GAME_CONFIG = {
  // Гравитация
  GRAVITY: 0.2,
  // Сопротивление
  FRICTION: 0.8,
  // Скорость персонажа
  PLAYER_SPEED: 2,
  // Мощность прыжка
  PLAYER_JUMP_POWER: 3,
} as const;
