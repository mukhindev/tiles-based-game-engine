# Tiles-based game engine (alpha)

Состояние: alpha

2D игровой движок для простейших тайловых игр.

Demo: https://mukhindev.github.io/tiles-based-game-engine/

## История

Игра создавалась в рамках командного модуля курса Яндекс.Практикум [Мидл фронтенд-разработчик](https://practicum.yandex.ru/middle-frontend).
Необходимо было разработать игру и сопутствующий портал на React c регистрацией, форумом, таблица лидеров и т.д.
Как раз мне выпала честь работать непосредственно с игрой.
По-условию, для игры нельзя было использовать любые гейм-библиотеки и библиотека работы с Canvas.

Командный проект: https://github.com/Minneapolis-7/game

Спасибо [Антону Субботину](https://github.com/kotosha-real) (ментор команды), [Андрею Волокитину](https://github.com/andreyvolokitin) и [Дарье Жеребцовой](https://github.com/DariaZherebtsova),
за отзывы, мнения, ревью кода и некоторые правки по игре.

## Почему tiles-based игра?

Я впервые занимаюсь разработкой игры, мне показалось,
что у игр с тайловой графикой понятная реализация.

## Как работает?

Как минимум нужно описать 4 сущности:

* Спрайты
* Игровые объекты
* Уровни
* Управление

Далее создать экземпляр игры в котором зарегистрировать данные сущности.

### Спрайты

Спрайты — графические изображения.

Один спрайт может содержать раскадровку, располагать которую следует горизонтально.
Каждый кадр в спрайте в терминологии данного движка называется `spriteFrame`.
Рекомендуется использовать соотношение сторон `1:1` для каждого кадра.

Например: `32x32` если 1 кадр, `96x32` если 3 кадра.

Изображения спрайтов по-умолчанию находятся в `./src/assets/sprites`

Пример описания спрайтов:

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

Описанные спрайты необходимо зарегистрировать в игре, см. [Игра](#игра)

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

// Регистрируем canvas, на него будет выводиться игра
game.view.registerCanvas(canvas);

// Регистрируем управление с клавиатуры
game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT);
game.control.registerKey('Space', CONTROL_KEY.SPACE);

// Запускаем. Колбек выполнится после заверщения асинхронных загрузок ресурсов
game.init(() => console.log('Игра загружена'));

// Вставляем canvas в контейнер приложения
app.append(canvas);
```

### Утилиты

`makeAnimation()`

Описание в работе...
