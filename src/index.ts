import Game from './entities/Game';
import { sprites } from './sprites';
import { sounds } from './sounds';
import { gameObjects } from './gameObjects';
import { levels } from './levels';
import { CONTROL_KEY } from './shared/constants';

const { body } = document;
const app = document.querySelector('.app');
const startButton = document.createElement('button');
const canvas = document.createElement('canvas');

body.style.margin = '0';
body.style.backgroundColor = '#000';
body.style.display = 'flex';
body.style.alignItems = 'center';
body.style.justifyContent = 'center';
body.style.height = '100vh';

startButton.textContent = 'Старт!';

canvas.style.width = '95vw';
canvas.style.maxHeight = '95vh';
canvas.style.objectFit = 'contain';
canvas.style.border = 'none';

if (!app) {
  throw Error('Не найден элемент с классом .app');
}

const game = new Game();

game.registerSprites(sprites);
game.registerSounds(sounds);
game.registerGameObjects(gameObjects);
game.registerLevels(levels);

game.view.registerCanvas(canvas);

game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT);
game.control.registerKey('Space', CONTROL_KEY.SPACE);

// Политика браузеров запрещает воспроизводить звуки до действий пользователя
startButton.addEventListener('click', () => {
  game.init(() => console.log('Игра загружена'));
});

app.append(canvas);
app.append(startButton);
