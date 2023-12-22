import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { EntityDynamic, Bullet } from '..'
import { Direction, EntityEvent } from '../Entity/types'
import { Speed } from '../EntityDynamic/data'
import { type EntityDynamicSettings } from '../EntityDynamic/types'

export class Tank extends EntityDynamic {
  width = 4
  height = 4
  movePace = 2
  moveSpeed = 3
  moveStepsTotal = 13
  shootSpeed = 2
  spawnTimeout = 1000
  canShoot = false
  bulletsLimit = 1
  bulletsFlying = 0
  shootForce = 1
  shooting = false
  frozen = true
  invincible = false
  sliding = false
  slidingStepsProgress = 0
  slidingStepsTotal = 20
  durability = 1

  constructor(props: EntityDynamicSettings) {
    super({ ...props, type: 'tank' })
    Object.assign(this, props)
    this.color = props.color || Color.Yellow

    this.registerTankEvents()
  }

  registerTankEvents() {
    this.on(EntityEvent.Spawn, () => {
      this.startAnimation({
        delay: 50,
        spriteCoordinates: spriteCoordinates.spawn,
        looped: true,
        stopTimer: this.spawnTimeout,
      })

      const color = this.color
      this.color = Color.LightCyan
      this.hittable = false
      this.setLoopDelay(() => {
        this.frozen = false
        this.canShoot = true
        this.hittable = true
        this.color = color
        this.emit(EntityEvent.Ready)
      }, this.spawnTimeout)
    })

    this.on(EntityEvent.Damaged, ({ source }) => {
      if (!this.invincible && this.role !== source.role && --this.durability <= 0) {
        this.beDestroyed(source)
      }
    })
  }

  setMoveSpeed(speed: Speed) {
    switch (speed) {
      case Speed.Low:
        this.moveSpeed = 0
        break
      case Speed.Medium:
        this.moveSpeed = 3
        break
      case Speed.High:
        this.moveSpeed = 6
        break
    }
  }

  setShootSpeed(speed: Speed) {
    switch (speed) {
      case Speed.Low:
        this.shootSpeed = 1
        break
      case Speed.Medium:
        this.shootSpeed = 2
        break
      case Speed.High:
        this.shootSpeed = 3
        break
    }
  }

  shoot() {
    if (!this.spawned || this.frozen || !this.canShoot || this.bulletsFlying >= this.bulletsLimit) {
      return
    }

    this.shooting = true
  }

  stateCheck() {
    if (this.sliding) {
      if (!this.canMove || ++this.slidingStepsProgress > this.slidingStepsTotal) {
        this.sliding = false
      } else {
        this.stopping = true
      }
    }

    if (!this.shooting) {
      return
    }

    const bullet = new Bullet({
      parent: this,
      ...this.calculateBulletInitPos(),
      role: this.role,
      direction: this.direction,
      moveSpeed: this.shootSpeed,
      explosionForce: this.shootForce,
    })

    ++this.bulletsFlying

    bullet.on(EntityEvent.Exploding, () => {
      --this.bulletsFlying
    })

    this.emit(EntityEvent.Shoot, bullet)

    this.shooting = false
  }

  calculateBulletInitPos() {
    const defaultSize = { width: 2, height: 2 }
    const rect = this.nextRect || this.lastRect || this.getRect()
    const offsetX = Math.round((rect.width - defaultSize.width) / 2)
    const offsetY = Math.round((rect.height - defaultSize.height) / 2)

    switch (this.direction) {
      case Direction.Up:
        return { posX: rect.posX + offsetX, posY: rect.posY }
      case Direction.Down:
        return {
          posX: rect.posX + offsetX,
          posY: rect.posY + rect.height - defaultSize.height,
        }
      case Direction.Left:
        return { posX: rect.posX, posY: rect.posY + offsetY }
      case Direction.Right:
        return {
          posX: rect.posX + rect.width - defaultSize.width,
          posY: rect.posY + offsetY,
        }
    }
  }

  slide(shouldSlide = true) {
    if (shouldSlide) {
      if (!this.sliding) {
        this.emit(EntityEvent.Slide)
      }
      this.sliding = true
      this.slidingStepsProgress = 0
    } else {
      this.sliding = false
    }
  }
}
