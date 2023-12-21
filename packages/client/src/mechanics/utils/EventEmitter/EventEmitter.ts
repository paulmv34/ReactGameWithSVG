import { type Fn } from './types'

export abstract class EventEmitter<T extends string = string> {
  listeners = {} as Record<T, Array<Fn>>

  on(eventName: T, callback: Fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push(callback)
    return this
  }

  emit<K extends Array<unknown>>(eventName: T, ...args: K) {
    this.listeners[eventName]?.forEach((listener: Fn) => {
      listener.apply(this, args)
    })
  }

  off(eventName: T, callback: Fn) {
    this.listeners[eventName] = this.listeners[eventName]?.filter(
      (listener: Fn) => listener !== callback
    )
    return this
  }

  offAll(eventName: T) {
    delete this.listeners[eventName]
    return this
  }

  clearAllListeners() {
    Object.keys(this.listeners).forEach((eventName) => {
      delete this.listeners[eventName as T]
    })
  }
}
