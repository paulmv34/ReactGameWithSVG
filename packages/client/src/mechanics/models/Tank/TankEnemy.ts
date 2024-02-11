import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import {
  type SpriteCoordinatesNoAnimations,
  type SpriteCoordinatesWithAnimations,
} from '@/mechanics/services/View/types'
import { rand } from '@/mechanics/utils'
import { Direction, EntityEvent } from '../Entity/types'
import { Speed } from '../EntityDynamic/data'
import { Tank } from './Tank'
import { type EnemyVariant, type TankEnemySettings } from './types'

export class TankEnemy extends Tank {
  lastDirection = Direction.Down
  variant: EnemyVariant = 'BASIC'
  flashing = false
  minReactionTime = 500
  maxReactionTime = 1000
  turnChance = 1
  keepMovingChance = 5
  moveUpChance = 1
  moveDownChance = 6
  moveSidewaysChance = 3
  secondarySpriteCoordinates: SpriteCoordinatesNoAnimations | SpriteCoordinatesWithAnimations = null

  constructor(props: TankEnemySettings) {
    super({ posX: 0, posY: 0 })
    this.color = Color.Aqua
    this.role = 'enemy'
    Object.assign(this, props)

    switch (this.variant) {
      case 'FAST':
        this.setMoveSpeed(Speed.High)
        this.setShootSpeed(Speed.Medium)
        this.mainSpriteCoordinates = spriteCoordinates['tank.enemy.default.b']
        this.secondarySpriteCoordinates = spriteCoordinates['tank.enemy.danger.b']
        break
      case 'POWER':
        this.setMoveSpeed(Speed.Medium)
        this.setShootSpeed(Speed.High)
        this.mainSpriteCoordinates = spriteCoordinates['tank.enemy.default.c']
        this.secondarySpriteCoordinates = spriteCoordinates['tank.enemy.danger.c']
        break
      case 'ARMOR':
        this.setMoveSpeed(Speed.Low)
        this.setShootSpeed(Speed.Medium)
        this.durability = 4
        this.mainSpriteCoordinates = spriteCoordinates['tank.enemy.secondary.d']
        this.secondarySpriteCoordinates = spriteCoordinates['tank.enemy.danger.d']
        break
      default:
        this.setMoveSpeed(Speed.Low)
        this.setShootSpeed(Speed.Low)
        this.mainSpriteCoordinates = spriteCoordinates['tank.enemy.default.a']
        this.secondarySpriteCoordinates = spriteCoordinates['tank.enemy.danger.a']
    }

    this.registerTankEnemyEvents()
  }

  registerTankEnemyEvents() {
    this.on(EntityEvent.Ready, () => {
      this.move(Direction.Down)
      this.autoMove()
      this.autoShoot()
    })

    this.on(EntityEvent.Damaged, () => {
      if (this.variant !== 'ARMOR') {
        return
      }
      if (this.durability === 3) {
        this.mainSpriteCoordinates = spriteCoordinates['tank.enemy.primary.d']
      }
      if (this.durability === 2) {
        this.mainSpriteCoordinates = spriteCoordinates['tank.enemy.secondary.d']
      }
      if (this.durability === 1) {
        this.mainSpriteCoordinates = spriteCoordinates['tank.enemy.default.d']
      }
      this.secondarySpriteCoordinates = spriteCoordinates['tank.enemy.danger.d']
      this.refreshSprite()
    })
  }

  autoMove() {
    this.setLoopDelay(() => {
      if (this.spawned) {
        this.move(this.getMoveDirection())
        this.autoMove()
      }
    }, rand(this.minReactionTime, this.maxReactionTime))
  }

  setFlashing() {
    const flashingIntervalMs = 200
    const flashingIntervalName = 'flashing' + rand(0, 999999)

    this.setLoopInterval(
      () => {
        const tempSpriteCoordinates = this.mainSpriteCoordinates
        this.mainSpriteCoordinates = this.secondarySpriteCoordinates
        this.secondarySpriteCoordinates = tempSpriteCoordinates
        this.refreshSprite()
      },
      flashingIntervalMs,
      flashingIntervalName
    )
  }

  autoShoot() {
    this.setLoopDelay(() => {
      if (this.spawned) {
        this.shoot()
        this.autoShoot()
      }
    }, rand(this.minReactionTime, this.maxReactionTime))
  }

  getRandomDirection() {
    const directions = [
      ...new Array(this.moveUpChance).fill(Direction.Up),
      ...new Array(this.moveDownChance).fill(Direction.Down),
      ...new Array(this.moveSidewaysChance).fill(Direction.Left),
      ...new Array(this.moveSidewaysChance).fill(Direction.Right),
    ]

    return directions[Math.floor(Math.random() * directions.length)]
  }

  getRandomAction() {
    const actions = [...new Array(this.turnChance).fill('turn'), ...new Array(this.keepMovingChance).fill('move')]

    return actions[Math.floor(Math.random() * actions.length)]
  }

  getMoveDirection() {
    if (this.canMove && this.getRandomAction() === 'move') {
      return this.direction
    }

    let newDirection: Direction
    do {
      newDirection = this.getRandomDirection()
    } while (
      this.lastDirection === newDirection ||
      (newDirection === Direction.Up && this.posY === 2) ||
      (newDirection === Direction.Down && this.posY === 50) ||
      (newDirection === Direction.Left && this.posX === 2) ||
      (newDirection === Direction.Right && this.posX === 50)
    )

    this.lastDirection = newDirection
    return newDirection
  }
}
