import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { type Bullet, type Tank, Entity } from '../'
import { Direction, EntityEvent } from '../Entity/types'
import { type ExplosionVariant } from './types'

type ExplosionSettings = { parent: Tank | Bullet }

export class Explosion extends Entity {
  variant: ExplosionVariant = 'BULLET_EXPLOSION'
  parent: ExplosionSettings['parent']
  despawnTime = 200

  constructor(settings: ExplosionSettings) {
    super({ posX: 0, posY: 0 })
    this.type = 'explosion'
    this.crossable = true
    this.hittable = false
    this.color = Color.Transparent
    this.parent = settings.parent
    Object.assign(this, this.calculateProps(settings))

    let animationDelay = 0
    switch (this.variant) {
      case 'BULLET_EXPLOSION':
        this.mainSpriteCoordinates = spriteCoordinates.bulletExplosion
        break
      case 'TANK_EXPLOSION':
        this.mainSpriteCoordinates = spriteCoordinates.tankExplosion
        animationDelay = 16
        break
    }

    this.registerExplosionEvents({ animationDelay })
  }

  registerExplosionEvents({ animationDelay }: { animationDelay: number }) {
    this.on(EntityEvent.Spawn, () => {
      this.startAnimation({
        delay: animationDelay,
        spriteCoordinates: this.mainSpriteCoordinates,
        looped: false,
      })

      this.on(EntityEvent.AnimationEnded, this.despawn.bind(this))
      this.setLoopDelay(this.despawn.bind(this), this.despawnTime)
    })
  }

  calculateProps({ parent }: ExplosionSettings) {
    const size = parent.type === 'bullet' ? 4 : 8
    const variant = parent.type === 'bullet' ? 'BULLET_EXPLOSION' : 'TANK_EXPLOSION'
    let posX = parent.posX
    let posY = parent.posY

    const correction = parent.direction === Direction.Up || parent.direction === Direction.Left ? -2 : 0

    if (parent.direction === Direction.Up || parent.direction === Direction.Down) {
      if (parent.type === 'tank') {
        if (parent.direction === Direction.Up) {
          posX += correction
          posY += correction - 2
        }
        if (parent.direction === Direction.Down) {
          posX += correction - 2
          posY += correction - 2
        }
      } else {
        posX -= 1
        posY += correction
      }
    } else {
      if (parent.type === 'tank') {
        if (parent.direction === Direction.Right) {
          posX += correction
          posY += correction - 2
        }
        if (parent.direction === Direction.Left) {
          posX += correction
          posY += correction
        }
      } else {
        posX += correction
        posY -= 1
      }
    }

    return { variant, posX, posY, width: size, height: size }
  }
}
