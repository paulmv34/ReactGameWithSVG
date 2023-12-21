import { type Direction } from '@/mechanics/models/Entity/types'
import { type EventEmitter } from '@/mechanics/utils'
import { type Binding } from './KeyBindings'

export type Controller = EventEmitter & {
  activeDirection?: Partial<Record<Direction, boolean>>
  disableEvents?: () => void
  emitBindingAction?: (binding: Binding) => void
  load: () => void
  registerEvents?: () => void
  reset: () => Controller
  shootIntervalMs?: number
  shootProcess?: ReturnType<typeof setInterval> | null
  startControlByEvent: (event: ControlEvent) => void
  stopBindingAction?: (binding: Binding) => void
  stopControlByEvent: (event: ControlEvent) => void
  stopControlForce?: () => void
  unload: () => void
}

export type ControlEvent = MouseEvent | KeyboardEvent
