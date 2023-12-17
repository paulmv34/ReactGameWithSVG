import { Entity } from '..'
import {
  type PosState,
  type Rect,
  Direction,
  EntityEvent,
} from '../Entity/types'
import { type EntityDynamicSettings } from './types'

export abstract class EntityDynamic extends Entity {
  moving = false
  stopping = false
  canMove = true
  lastRect: Rect | null = null
  nextRect: Rect | null = null
  movePace = 2
  moveSpeed = 3
  moveStepsProgress = 0
  moveStepsTotal = 12
  nextDirection = Direction.Up
  moveLoops = 0
  frozen = false

  constructor(props: EntityDynamicSettings) {
    super(props)
    this.movable = true
  }

  getMoveSteps() {
    return this.moveStepsTotal - this.moveSpeed
  }

  getMoveStepPace() {
    return this.movePace / this.getMoveSteps()
  }

  move(direction: Direction) {
    this.moving = true
    this.nextDirection = direction

    if (this.spawned && !this.frozen) {
      this.emit(EntityEvent.Move)
    }
  }

  stop() {
    this.moving = false
    if (this.moveStepsProgress) {
      this.stopping = true
    }

    this.emit(EntityEvent.Stop)
  }

  turn(newDirection: Direction = this.nextDirection) {
    if (this.direction !== newDirection) {
      this.emit(EntityEvent.Stop)
      if (this.moving) {
        this.emit(EntityEvent.Move)
      }
      this.setState({ direction: newDirection })
      this.moveLoops = 0
    }
  }

  update() {
    if (!this.spawned || this.frozen) {
      return
    }

    this.stateCheck()
    if (this.shouldBeDestroyed) {
      return
    }

    const isStandingStill =
      !this.moving && !this.stopping && !this.shouldBeDestroyed
    if (isStandingStill) {
      return
    }

    const hasUnfinishedMove = this.moveStepsProgress !== 0
    if (hasUnfinishedMove) {
      this.moveStep()
      return
    }

    const hasNewDirection = this.stopping
      ? false
      : this.direction !== this.nextDirection
    const canTurnWithoutInterrupt = this.moveLoops > this.getMoveSteps()
    if (hasNewDirection) {
      canTurnWithoutInterrupt ? this.turn() : this.turnWithInterrupt()
    } else {
      this.prepareToMove()
      this.moveStep()
    }
  }

  abstract stateCheck(): void

  turnWithInterrupt() {
    this.turn()
    ++this.moveStepsProgress
    this.canMove = false
  }

  prepareToMove() {
    this.lastRect = this.getRect()
    const nextRect = { ...this.lastRect, ...this.getNextMove(true) }
    const posState: PosState = {
      hasCollision: undefined,
      nextRect,
    }
    this.emit(EntityEvent.WillHaveNewPos, posState)
    if (!posState.hasCollision) {
      this.canMove = true
      this.nextRect = nextRect
    } else {
      this.canMove = false
      this.nextRect = null
    }
  }

  getNextMove(fullMove = false) {
    let movePace = 0
    if (fullMove) {
      movePace = this.movePace
    } else {
      movePace = this.getMoveStepPace()
    }

    switch (this.direction) {
      case Direction.Up:
        return { posY: this.posY - movePace }
      case Direction.Down:
        return { posY: this.posY + movePace }
      case Direction.Left:
        return { posX: this.posX - movePace }
      case Direction.Right:
        return { posX: this.posX + movePace }
    }
  }

  moveStep() {
    const fullCycle = ++this.moveStepsProgress >= this.getMoveSteps()
    if (fullCycle) {
      this.moveStepsProgress = 0
      this.alignedToGrid = true
      this.stopping = false
      if (this.canMove && this.nextRect) {
        this.setState(this.nextRect)
        ++this.moveLoops
      }
    } else {
      this.alignedToGrid = false
      if (this.canMove) {
        this.setState(this.getNextMove())
        ++this.moveLoops
      } else {
        this.refreshSprite()
      }
    }
  }
}
