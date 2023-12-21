import { ControllerBase } from './ControllerBase'
import { type BindingConfig } from './KeyBindings'
import { type ControlEvent } from './types'

export class ControllerKeyboard extends ControllerBase {
  keyBindings: BindingConfig

  constructor(keyBindings: BindingConfig) {
    super()
    this.keyBindings = keyBindings
  }

  registerEvents() {
    document.addEventListener('keydown', this.startControlByEvent)
    document.addEventListener('keyup', this.stopControlByEvent)
  }

  disableEvents() {
    document.removeEventListener('keydown', this.startControlByEvent)
    document.removeEventListener('keyup', this.stopControlByEvent)
  }

  startControlByEvent = (event: ControlEvent) => {
    if (!(event instanceof KeyboardEvent) || event.repeat) {
      return false
    }
    const keyBinding = this.getKeyBinding(event.code)
    if (keyBinding) {
      this.emitBindingAction(keyBinding)
      this.preventDefaultEvent(event)
    }
  }

  stopControlByEvent = (event: ControlEvent) => {
    if (!(event instanceof KeyboardEvent)) {
      return false
    }

    const keyBinding = this.getKeyBinding(event.code)
    if (keyBinding) {
      this.stopBindingAction(keyBinding)
      this.preventDefaultEvent(event)
    }
  }

  preventDefaultEvent(event: ControlEvent) {
    if (
      event instanceof KeyboardEvent &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault()
    }
  }

  getKeyBinding(code: string) {
    return this.keyBindings[code] || null
  }
}
