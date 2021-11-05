import { GAME_CONFIG } from './constants';

function makeAnimation(
  target: (frame: number) => void,
  frames: number[],
  frameInterval: number = GAME_CONFIG.SPRITE_ANIMATION_FRAME_DURATION,
): void {
  let step = 0;

  const intervalId = setInterval(() => {
    if (step >= frames.length) {
      clearInterval(intervalId);
    } else {
      target(frames[step]);
      step += 1;
    }
  }, frameInterval);
}

export default makeAnimation;
