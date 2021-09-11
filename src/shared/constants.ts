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

export const HIT_BOX_KEY = {
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right',
  BOTTOM: 'bottom',
} as const;

export const DEBUG_DRAW_COLOR = {
  HIT_BOX: '#ff206e',
  ON_ABOVE_TILE: '#fbff12',
  ON_OVER_TILE: '#41ead4',
  Y: '#ffa5ab',
} as const;

// Настройки баланса игры
export const GAME_CONFIG = {
  // Рисовать отладочную графику
  IS_DEBUG_DRAW: false,
  // Гравитация
  GRAVITY: 0.2,
  // Сопротивление
  FRICTION: 0.8,
  // Скорость персонажа
  PLAYER_SPEED: 2,
  // Мощность прыжка
  PLAYER_JUMP_POWER: 2.5,
} as const;