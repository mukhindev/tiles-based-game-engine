import { ControlKeysState, RegisteredKeys } from '../types';
import text from '../shared/text';

export default class Control {
  public registeredKeys: RegisteredKeys;
  public gamepad: Gamepad | null;
  public isActiveGamepad: boolean;
  public assignableButton: string;
  public keyCounter: number;
  public isGamepadConfigured: boolean;

  constructor() {
    this.registeredKeys = {};
    this.gamepad = null;
    this.isActiveGamepad = false;
    this.assignableButton = '';
    this.keyCounter = 0;
    this.isGamepadConfigured = false;
  }

  handleKeyPressed = (evt: KeyboardEvent): void => {
    evt.preventDefault();
    this.isActiveGamepad = false;

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

  handleGamepadConnected = ({ gamepad }: GamepadEvent): void => {
    this.gamepad = gamepad;
  };

  handleGamepadDisconnected = (): void => {
    this.gamepad = null;
  };

  registerKey(keyCode: string, key: string, description: string): void {
    this.registeredKeys[keyCode] = { key, state: false, gamepadButton: null, description };
    this.keyCounter += 1;
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
    window.addEventListener('gamepadconnected', this.handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', this.handleGamepadDisconnected);
  }

  assignGamepadButtons(): void {
    navigator.getGamepads()[this.gamepad?.index || 0]?.buttons.forEach((button, index) => {
      if (button.pressed) {
        if (this.assignableButton) {
          const { assignableButton } = this;

          this.assignableButton = '';
          this.registeredKeys[assignableButton].gamepadButton = index;
        }

        Object.entries(this.registeredKeys).forEach(([keyCode, { gamepadButton, description }]) => {
          if (gamepadButton === null && !this.assignableButton) {
            // eslint-disable-next-line no-alert
            alert(`${text.game.gamepadConfiguration} ${description}`);
            this.assignableButton = keyCode;
          }
        });
      }
    });

    this.isGamepadConfigured = Object.values(this.registeredKeys).every(
      (el) => el.gamepadButton !== null,
    );
  }

  update(): void {
    if (!this.gamepad) {
      return;
    }

    if (!this.isGamepadConfigured) {
      this.assignGamepadButtons();

      return;
    }

    Object.entries(this.registeredKeys).forEach(([keyCode, { gamepadButton }]) => {
      if (gamepadButton === null) {
        return;
      }

      const isPressed = navigator
        .getGamepads()[this.gamepad?.index || 0]?.buttons[gamepadButton].pressed;

      if (isPressed) {
        this.isActiveGamepad = true;
        this.registeredKeys[keyCode].state = true;
      } else if (this.isActiveGamepad) {
        this.registeredKeys[keyCode].state = false;
      }
    });
  }

  destroy(): void {
    Object.keys(this.registeredKeys).forEach((key) => {
      this.registeredKeys[key].state = false;
    });
    document.removeEventListener('keydown', this.handleKeyPressed);
    document.removeEventListener('keyup', this.handleKeyReleased);
    window.removeEventListener('gamepadconnected', this.handleGamepadConnected);
    window.removeEventListener('gamepaddisconnected', this.handleGamepadDisconnected);
  }
}
