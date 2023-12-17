import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { type Tank, EntityDynamic } from '..'
import { type BulletSettings } from './types'

export class Bullet extends EntityDynamic {
  width = 2
  height = 2
  movePace = 2
  moveSpeed = 1
  moveSpeedPrev = 1
  moveStepsTotal = 5
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
}
