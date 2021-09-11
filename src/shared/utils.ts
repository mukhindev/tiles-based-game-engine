export function makeAnimation(
  target: (frame: number) => void,
  frames: number[],
  frameInterval: number,
) {
  let step = 0;
  const srt = setInterval(() => {
    if (step >= frames.length) {
      clearInterval(srt);
    } else {
      target(frames[step]);
      step += 1;
    }
  }, frameInterval || 1000 / 60);
}
