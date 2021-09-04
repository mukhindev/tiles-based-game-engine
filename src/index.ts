import Game from './entities/Game';
import { sprites } from './sprites';
import { gameObjects } from './gameObjects';
import { levels } from './levels';
import { CONTROL_KEY } from './shared/constants';

const app = document.querySelector('.app');
const canvas = document.createElement('canvas');

if (!app) {
  throw Error('Не найден элемент с классом .app');
}

const game = new Game();

game.registerSprites(sprites);
game.registerGameObjects(gameObjects);
game.registerLevels(levels);

game.view.registerCanvas(canvas);

game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT);
game.control.registerKey('Space', CONTROL_KEY.SPACE);

game.init(() => console.log('Игра загружена'));

app.append(canvas);
