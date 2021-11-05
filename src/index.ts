import Game from './entities/Game';
import { sprites } from './sprites';
import { sounds } from './sounds';
import { gameObjects } from './gameObjects';
import { levels } from './levels';
import { CONTROL_KEY } from './shared/constants';
import text from './shared/text';

const { body } = document;
const app = document.querySelector('.app');
const startButton = document.createElement('button');
const canvas = document.createElement('canvas');

body.style.margin = '0';
body.style.backgroundColor = '#000';

app!.style.display = 'flex';
app!.style.flexDirection = 'column';
app!.style.alignItems = 'center';
app!.style.justifyContent = 'center';
app!.style.height = '100vh';

startButton.textContent = 'Старт!';
startButton.style.fontSize = '2rem';

canvas.style.width = '0';
canvas.style.maxHeight = '0';
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

game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT, text.game.control.left);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT, text.game.control.right);
game.control.registerKey('Space', CONTROL_KEY.SPACE, text.game.control.jump);

// Политика браузеров запрещает воспроизводить звуки до действий пользователя
startButton.addEventListener('click', () => {
  game.init(() => {
    console.log('Игра загружена');
    canvas.style.width = '95vw';
    canvas.style.maxHeight = '95vh';
    startButton.remove();
  });
});

app.append(canvas);
app.append(startButton);
