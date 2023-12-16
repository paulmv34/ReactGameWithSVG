import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { Tank } from './Tank'
import { type PlayerVariant, type TankPlayerSettings } from './types'

export { type PlayerVariant, type TankPlayerSettings }

export class TankPlayer extends Tank {
  variant: PlayerVariant = 'PLAYER1'

  constructor(props: TankPlayerSettings) {
    super({ posX: 0, posY: 0 })
    this.role = 'player'
    Object.assign(this, props)

    this.updateTankSpecs()
  }

  updateTankSpecs() {
    const isPlayerOne = this.variant === 'PLAYER1'

    this.mainSpriteCoordinates = isPlayerOne
      ? spriteCoordinates['tank.player.primary.a']
      : spriteCoordinates['tank.player.secondary.a']

    this.refreshSprite()
  }
}
