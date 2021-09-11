# Tiles-based game engine (alpha)

Состояние: alpha

2D игровой движок для простейших тайловых игр.

Demo: https://mukhindev.github.io/tiles-based-game-engine/

## Почему tiles-based игра?

Я впервые занимаюсь разработкой игры, мне показалось,
что у игр с тайловой графикой самая простоя реализация.

## Как работает?

Как минимум нужно описать 3 сущности:

* Спрайты
* Игровые объекты
* Уровни

Далее создать экземпляр игры в котором зарегистрировать данные сущности.

### Спрайты

Спрайты — графические изображения.

Один спрайт может содержать раскадровку, располагать которую следует горизонтально.
Каждый кадр в терминологии данного движка называется `spriteFrame`.
Рекомендуется использовать соотношение сторон `1:1` для каждого кадра.

Например: `32x32` если 1 кадр, `96x32` если 3 кадра.

Изображения спрайтов по-умолчанию находятся в `./src/sprites`

Пример регистрации спрайтов:

```ts
/* src/sprites.ts */

// Изображения спрайтов
import airSprite from './sprites/air.png';
import playerSprite from './sprites/player.png';
import brickSprite from './sprites/brick.png';

// Идентификаторы
export const SPRITE_ID = {
  PLAYER: 'player',
  AIR: 'air',
  BRICK: 'brick',
} as const;

// Описываем спрайты 
export const sprites: SpriteRegisterOptions[] = [
  { id: SPRITE_ID.PLAYER, src: playerSprite },
  { id: SPRITE_ID.AIR, src: airSprite },
  { id: SPRITE_ID.BRICK, src: brickSprite },
];
```

### Игровые объекты

Описание в работе...

### Уровни

Описание в работе...

### Игра

```ts
/* src/index.ts */

import Game from './entities/Game';
import { sprites } from './sprites';
import { gameObjects } from './gameObjects';
import { levels } from './levels';
import { CONTROL_KEY } from './shared/constants';

// Контейнер приложения
const app = document.querySelector('.app');
// canvas для игры
const canvas = document.createElement('canvas');

const game = new Game();

// Регистрируем подготовленные сущности
game.registerSprites(sprites);
game.registerGameObjects(gameObjects);
game.registerLevels(levels);

// Указываем какой canvas игре использовать
game.view.registerCanvas(canvas);

// Регистрируем управление с клавиатуры
game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT);
game.control.registerKey('Space', CONTROL_KEY.SPACE);

game.init(() => console.log('Игра загружена'));

// Вставляем canvas в контейнер приложения
app.append(canvas);
```

### Утилиты

`makeAnimation()`

Описание в работе...
