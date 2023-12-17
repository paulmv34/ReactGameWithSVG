import { Color } from '@/mechanics/services/View/colors'
import {
  type Animations,
  type AnimationSettings,
  type CancelAnimation,
  type SpriteCoordinatesNoAnimations,
  type SpriteCoordinatesWithAnimations,
} from '@/mechanics/services/View/types'
import { EventEmitter } from '@/mechanics/utils'
import {
  type EntityRole,
  type EntitySettings,
  type EntityType,
  type Pos,
  type PosState,
  type Rect,
  Direction,
  EntityEvent,
} from './types'

export { EntityEvent }

export abstract class Entity extends EventEmitter<EntityEvent> {
  posX = 0
  posY = 0
  width = 0
  height = 0
  direction = Direction.Up
  role: EntityRole = 'neutral'
  type: EntityType = 'custom'
  spawned = false
  alignedToGrid = true
  movable = false
  flying = false
  crossable = false
  hittable = true
  color: Color | string = Color.Grey
  shouldBeDestroyed = false
  damagedBy: Entity | null = null
  destroyedBy: Entity | null = null
  invincible = false
  mainSpriteCoordinates:
    | SpriteCoordinatesNoAnimations
    | SpriteCoordinatesWithAnimations = null
  mainSpriteFrame = 0
  animationList: Animations = []
  backImg: HTMLImageElement | HTMLCanvasElement | null = null
  backColor: Color | null = null

  constructor(props: EntitySettings) {
    super()
    Object.assign(this, props)
  }

  setState(newState: Partial<Entity>) {
    this.emit(EntityEvent.ShouldUpdate, newState)
    Object.assign(this, newState)
    this.emit(EntityEvent.DidUpdate, newState)
  }

  getRect() {
    return {
      posX: this.posX,
      posY: this.posY,
      width: this.width,
      height: this.height,
    }
  }

  spawn(coords?: Pos) {
    const { posX, posY } = coords || { posX: this.posX, posY: this.posY }

    const posState: PosState = {
      hasCollision: undefined,
      nextRect: { posX, posY, width: this.width, height: this.height },
    }
    this.emit(EntityEvent.WillHaveNewPos, posState)
    if (!posState.hasCollision) {
      this.setState({ posX, posY })
      this.spawned = true
      this.emit(EntityEvent.Spawn)
    } else if (this.type === 'bullet') {
      this.explode()
    }

    return this.spawned
  }

  despawn() {
    if (!this.spawned) {
      return
    }
    this.shouldBeDestroyed = true
    this.emit(EntityEvent.ShouldBeDestroyed)
    this.emit(EntityEvent.Despawn)
    this.spawned = false
  }

  explode() {
    this.emit(EntityEvent.Exploding)
    this.despawn()
  }

  beDestroyed(source: Entity) {
    this.explode()
    this.destroyedBy = source
    this.emit(EntityEvent.Destroyed, source)
  }

  takeDamage(source: Entity, rect: Rect) {
    if (this.type === 'tank' && this.damagedBy === source) {
      return
    }
    this.damagedBy = source
    this.emit(EntityEvent.Damaged, { ...rect, source })
  }

  startAnimation(settings: AnimationSettings) {
    settings.name ??= Math.random().toString()
    settings.spriteFrame ??= 0
    this.animationList.push(settings)

    this.refreshSprite()
    this.setLoopInterval(
      () => {
        this.refreshSprite()
      },
      settings.delay,
      settings.name
    )

    this.emit(EntityEvent.AnimationStarted, settings.name)

    if (settings.stopTimer) {
      this.setLoopDelay(
        this.cancelAnimation.bind(this, 'showEntity', settings.name),
        settings.stopTimer
      )
    }
  }

  cancelAnimation(type: CancelAnimation = 'eraseEntity', name: string) {
    this.clearLoopInterval(name)

    const animationIndex = this.animationList.findIndex(
      (animation) => animation.name === name
    )
    this.animationList.splice(animationIndex, 1)

    this.emit(EntityEvent.AnimationEnded, name)

    if (type === 'showEntity') {
      this.refreshSprite()
      return
    }

    if (type === 'eraseEntity') {
      this.emit(EntityEvent.ShouldUpdate)
    }
  }

  refreshSprite() {
    this.emit(EntityEvent.ShouldUpdate)
    this.emit(EntityEvent.DidUpdate)
  }

  setLoopInterval(callback: () => void, delay: number, name: string | number) {
    this.emit(EntityEvent.SetLoopInterval, callback, delay, name)
  }

  clearLoopInterval(name: string | number) {
    this.emit(EntityEvent.ClearLoopInterval, name)
  }

  setLoopDelay(callback: () => void, delay: number) {
    this.emit(EntityEvent.SetLoopDelay, callback, delay)
  }
}
