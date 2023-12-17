import { type Entity } from '@/mechanics/models'
import { type EntityEvent, type Rect } from '@/mechanics/models/Entity/types'
import { type UIElement } from '@/mechanics/ui'

export type LayerEntity = {
  instance: Entity
  listeners: Record<string, (...args: Array<Rect>) => void>
}

export type LayerList = Record<
  string,
  {
    context: CanvasRenderingContext2D
    entities: Set<LayerEntity>
  }
>

export type GetSpriteCoordinates = {
  animation?: AnimationSettings
  entity: Entity
}

export type SpriteCoordinatesNoAnimations = null | number[][]
export type SpriteCoordinatesWithAnimations = Record<string, number[][]>

export type Animations = AnimationSettings[]

export type AnimationSettings = {
  delay: number
  lastTime?: number
  looped: boolean
  name?: string
  showMainSprite?: boolean
  spriteCoordinates:
    | SpriteCoordinatesWithAnimations
    | SpriteCoordinatesNoAnimations
  spriteFrame?: number
  stopTimer?: number
}

export type CancelAnimation = 'showEntity' | 'eraseEntity'

export type LayerObject<T extends Entity | UIElement> = {
  instance: T
  listeners: {
    [K in EntityEvent]?: (rect: Rect) => void
  }
}
