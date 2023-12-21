import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { Tank } from './Tank'
import { Speed } from '../EntityDynamic/data'
import { EntityEvent } from '../Entity/types'
import { type PlayerVariant, type TankPlayerSettings } from './types'

export { type PlayerVariant, type TankPlayerSettings }

export class TankPlayer extends Tank {
  variant: PlayerVariant = 'PLAYER1'
  spawnShieldTimeout = 3000
  upgradeTier = 1

  constructor(props: TankPlayerSettings) {
    super({ posX: 0, posY: 0 })
    this.role = 'player'
    Object.assign(this, props)

    this.updateTankSpecs()
    this.registerTankPlayerEvents()
  }

  registerTankPlayerEvents() {
    this.on(EntityEvent.Ready, () => {
      this.useShield(this.spawnShieldTimeout)
    })
  }

  useShield(timeout: number) {
    this.startAnimation({
      delay: 50,
      spriteCoordinates: spriteCoordinates.shield,
      looped: true,
      stopTimer: timeout,
      showMainSprite: true,
    })

    this.invincible = true
    this.setLoopDelay(() => {
      this.invincible = false
    }, timeout)
  }

  upgrade() {
    ++this.upgradeTier
    this.updateTankSpecs()
  }

  updateTankSpecs() {
    const isPlayerOne = this.variant === 'PLAYER1'

    if (this.upgradeTier >= 1) {
      this.setMoveSpeed(Speed.Medium)
      this.setShootSpeed(Speed.Medium)
      this.mainSpriteCoordinates = isPlayerOne
        ? spriteCoordinates['tank.player.primary.a']
        : spriteCoordinates['tank.player.secondary.a']
    }
    if (this.upgradeTier >= 2) {
      this.setShootSpeed(Speed.High)
      this.mainSpriteCoordinates = isPlayerOne
        ? spriteCoordinates['tank.player.primary.b']
        : spriteCoordinates['tank.player.secondary.b']
    }
    if (this.upgradeTier >= 3) {
      this.bulletsLimit = 2
      this.mainSpriteCoordinates = isPlayerOne
        ? spriteCoordinates['tank.player.primary.c']
        : spriteCoordinates['tank.player.secondary.c']
    }
    if (this.upgradeTier >= 4) {
      this.shootForce = 2
      this.mainSpriteCoordinates = isPlayerOne
        ? spriteCoordinates['tank.player.primary.d']
        : spriteCoordinates['tank.player.secondary.d']
    }

    this.refreshSprite()
  }
}
