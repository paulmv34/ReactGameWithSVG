import { Direction } from '@/mechanics/models/Entity/types'
import { ControllerEvent } from './data'

export type Binding =
  | [ControllerEvent.Move, Direction]
  | [ControllerEvent.Shoot]
  | [ControllerEvent.Escape]

export type BindingConfig = Record<string, Binding>

export const KeyBindingsWasd: BindingConfig = {
  KeyW: [ControllerEvent.Move, Direction.Up],
  KeyA: [ControllerEvent.Move, Direction.Left],
  KeyS: [ControllerEvent.Move, Direction.Down],
  KeyD: [ControllerEvent.Move, Direction.Right],
  Space: [ControllerEvent.Shoot],
}

export const KeyBindingsArrows: BindingConfig = {
  ArrowUp: [ControllerEvent.Move, Direction.Up],
  ArrowLeft: [ControllerEvent.Move, Direction.Left],
  ArrowDown: [ControllerEvent.Move, Direction.Down],
  ArrowRight: [ControllerEvent.Move, Direction.Right],
  Enter: [ControllerEvent.Shoot],
}
