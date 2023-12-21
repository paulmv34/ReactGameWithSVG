import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { type Tank, EntityDynamic } from '../'
import { Direction, EntityEvent } from '../Entity/types'
import { type BulletSettings } from './types'

export class Bullet extends EntityDynamic {
  width = 2
  height = 2
  movePace = 2
  moveSpeed = 1
  moveSpeedPrev = 1
  moveStepsTotal = 5
  explosionRadius = 1
  explosionForce = 1
  parent: Tank | null = null

  constructor(props: BulletSettings) {
    super(props)
    Object.assign(this, props)
    this.type = 'bullet'
    this.color = Color.Red
    this.mainSpriteCoordinates = spriteCoordinates.bullet
    this.flying = true
    this.moving = true
    this.nextDirection = this.direction

    this.registerBulletEvents()
  }

  registerBulletEvents() {
    this.on(EntityEvent.Damaged, () => {
      this.explode()
    })
  }

  explode() {
    super.explode()
    this.emit(EntityEvent.WillDoDamage, this.calculateExplosionRect())
  }

  stateCheck() {
    if (!this.canMove) {
      if (this.movePace === 2) {
        this.movePace = 1
        this.moveSpeedPrev = this.moveSpeed
        this.moveSpeed = this.moveStepsTotal - 1
        this.canMove = true
        this.moveStepsProgress = 0
      } else {
        this.explode()
      }
    } else if (this.movePace === 1) {
      this.movePace = 2
      this.moveSpeed = this.moveSpeedPrev
    }
  }

  calculateExplosionRect() {
    switch (this.direction) {
      case Direction.Up:
        return {
          posX: this.posX - this.explosionRadius,
          posY: this.posY - this.explosionForce,
          width: this.width + this.explosionRadius * 2,
          height: this.height,
        }
      case Direction.Down:
        return {
          posX: this.posX - this.explosionRadius,
          posY: this.posY + this.explosionForce,
          width: this.width + this.explosionRadius * 2,
          height: this.height,
        }
      case Direction.Left:
        return {
          posX: this.posX - this.explosionForce,
          posY: this.posY - this.explosionRadius,
          width: this.width,
          height: this.height + this.explosionRadius * 2,
        }
      case Direction.Right:
        return {
          posX: this.posX + this.explosionForce,
          posY: this.posY - this.explosionRadius,
          width: this.width,
          height: this.height + this.explosionRadius * 2,
        }
    }
  }
}
