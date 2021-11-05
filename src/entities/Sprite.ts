import text from '../shared/text';

export type SpriteConstructorOptions = {
  id: number | string;
  src: string;
};

export default class Sprite {
  public id: number | string;
  public src: string;
  public image: HTMLImageElement;

  constructor(options: SpriteConstructorOptions) {
    this.id = options.id;
    this.src = options.src;
    this.image = new Image();
  }

  load(): Promise<Sprite> {
    return new Promise((resolve, reject) => {
      this.image.src = this.src;
      this.image.onload = () => resolve(this);
      this.image.onerror = () => reject(new Error(text.errors.loadingSprite));
    });
  }
}
