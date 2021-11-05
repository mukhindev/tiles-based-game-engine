import { css } from '@emotion/css';

import Game from './entities/Game';
import { sprites } from './sprites';
import { sounds } from './sounds';
import { gameObjects } from './gameObjects';
import { levels } from './levels';
import { CONTROL_KEY } from './shared/constants';
import text from './shared/text';

// Стили
const bodyStyles = css`
  margin: 0;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000;
`;

const appStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const startButtonStyles = css`
  font: inherit;
  font-size: 2rem;
`;

const canvasStyles = css`
  width: 0;
  max-height: 0;
  object-fit: contain;
  border: none;
`;

// Тело документа
const { body } = document;
body.className = bodyStyles;

// Обёртка приложения
const app = document.createElement('div');
app.className = appStyles;
body.append(app);

// Стартовая кнопка
const startButton = document.createElement('button');
startButton.className = startButtonStyles;
startButton.textContent = 'Старт!';
app.append(startButton);

// Полотно игры
const canvas = document.createElement('canvas');
canvas.className = canvasStyles;
app.append(canvas);

// Игра
const game = new Game();

// Регистрация спрайтов, звуков, игровых объектов и уровней
game.registerSprites(sprites);
game.registerSounds(sounds);
game.registerGameObjects(gameObjects);
game.registerLevels(levels);

// Выбираем полотно (canvas) на которое выводить игру
game.registerCanvas(canvas);

// Добавление управления
game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT, text.control.left);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT, text.control.right);
game.control.registerKey('Space', CONTROL_KEY.SPACE, text.control.jump);

// Политика браузеров запрещает воспроизводить звуки до действий пользователя
startButton.addEventListener('click', () => {
  // Инициализация игры
  game.init(() => {
    // При успешном запуске
    console.log('Игра загружена');
    canvas.style.width = '95vw';
    canvas.style.maxHeight = '95vh';
    startButton.remove();
  });
});
