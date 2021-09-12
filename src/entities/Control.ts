import { ControlKeysState, RegisteredKeys } from '../types';

export default class Control {
  public registeredKeys: RegisteredKeys;

  constructor() {
    this.registeredKeys = {};
  }

  handleKeyPressed = (evt: KeyboardEvent): void => {
    evt.preventDefault();

    if (this.registeredKeys[evt.code]) {
      this.registeredKeys[evt.code].state = true;
    }
  };

  handleKeyReleased = (evt: KeyboardEvent): void => {
    evt.preventDefault();

    if (this.registeredKeys[evt.code]) {
      this.registeredKeys[evt.code].state = false;
    }
  };

  registerKey(keyCode: string, key: string): void {
    this.registeredKeys[keyCode] = { key, state: false };
  }

  get keys(): ControlKeysState {
    return Object.values(this.registeredKeys).reduce(
      (acc, value) => ({ ...acc, [value.key]: value.state }),
      {} as ControlKeysState,
    );
  }

  init(): void {
    document.addEventListener('keydown', this.handleKeyPressed);
    document.addEventListener('keyup', this.handleKeyReleased);
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeyPressed);
    document.removeEventListener('keyup', this.handleKeyReleased);
  }
}
