export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;
export const CANVAS_BACKGROUND = '#000';
export const SPRITE_WIDTH = 32;
export const SPRITE_HEIGHT = 32;

export const CONTROL_KEY = {
  LEFT: 'left',
  RIGHT: 'right',
  SPACE: 'space',
} as const;

export const HIT_BOX_KEY = {
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right',
  BOTTOM: 'bottom',
} as const;

export const GAME_SESSION_KEY = {
  IS_KEY_ACQUIRED: 'isKeyAcquired',
  IS_DOOR_UNLOCKED: 'isDoorUnlocked',
  IS_GAME_COMPLETED: 'isGameCompleted',
  PLAYER_HEALTH: 'playerHealth',
  TIME: 'time',
  LEVEL: 'level',
  TOTAL_TIME: 'totalTime',
  POINTS: 'points',
} as const;

export const DEBUG_DRAW_COLOR = {
  HIT_BOX: '#ff206e',
  ON_ABOVE_TILE: '#fbff12',
  ON_OVER_TILE: '#41ead4',
  ON_OUT_TILE: '#ffa5ab',
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
  // Максимальное здоровье
  MAX_HEALTH: 3,
  // Длительность кадра фреймовых анимаций по-умолчанию в ms
  SPRITE_ANIMATION_FRAME_DURATION: 1000 / 60,
  // Векторная скорость выше которой спрайт персонажа поворачивается в сторону вектора
  PLAYER_MOVEMENT_SPITE_SENSITIVITY: 0.2,
  // Количество очков за пройденный уровень
  LEVEL_POINTS: 100000,
  // Максимальное кол-во бонусных очков за оставшееся время (минус 1 поинт за 1 мс)
  MAX_TIME_BONUS_POINTS: 60000,
} as const;
