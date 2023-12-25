import { Tank } from '../../models'
import { type Rect } from '../../models/Entity/types'
import { type Game } from '../'
import { AudioManager } from './AudioManager'

function mockEntity(rect: Rect) {
  const tank = new Tank(rect)
  tank.role = 'player'
  return tank
}

describe('game/services/AudioManager', () => {
  const mockAudioContext = {} as AudioContext
  const mockGame = { resources: { audioContext: mockAudioContext } } as Game

  it('should play sounds', () => {
    const audioManager = new AudioManager(mockGame)

    audioManager.playSound = jest.fn()

    const entity = mockEntity({ posX: 2, posY: 2, width: 2, height: 2 })

    audioManager.add(entity)
    entity.spawn({ posX: 2, posY: 2 })
    // По умолчанию у танка стоит false в течение 1 сек после спауна, пока работает анимация.
    entity.canShoot = true
    entity.frozen = false

    entity.shoot()
    entity.update()

    expect(audioManager.playSound).toHaveBeenNthCalledWith(1, 'shoot')
  })
})
