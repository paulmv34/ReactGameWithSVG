import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { Entity } from '..'
import {
  type DamageSettings,
  type EntitySettings,
  EntityEvent,
} from '../Entity/types'
import { type TerrainVariant } from './types'

export class Terrain extends Entity {
  variant: TerrainVariant = 'WHOLE'

  constructor(props: EntitySettings) {
    super(props)
    Object.assign(this, props)
    this.role = 'neutral'
    switch (this.type) {
      case 'boundary':
        this.crossable = false
        this.hittable = true
        this.color = Color.Grey
        break
      case 'brickWall':
        this.crossable = false
        this.hittable = true
        this.color = Color.Brown
        this.mainSpriteCoordinates =
          spriteCoordinates['terrain.brick'][this.variant]
        break
      case 'concreteWall':
        this.crossable = false
        this.hittable = true
        this.color = Color.LightGrey
        this.mainSpriteCoordinates =
          spriteCoordinates['terrain.concrete'][this.variant]
        break
      case 'trees':
        this.crossable = true
        this.hittable = false
        this.color = Color.Green
        this.mainSpriteCoordinates = spriteCoordinates['terrain.trees']
        break
      case 'water':
        this.crossable = false
        this.hittable = false
        this.color = Color.Blue
        this.mainSpriteCoordinates = spriteCoordinates['terrain.water']
        break
      case 'ice':
        this.crossable = true
        this.hittable = false
        this.color = Color.AliceBlue
        this.mainSpriteCoordinates = spriteCoordinates['terrain.ice']
        break
    }

    this.registerTerrainEvents()
  }

  registerTerrainEvents() {
    if (this.type === 'brickWall') {
      this.on(EntityEvent.Damaged, (damagedRect: DamageSettings) => {
        this.emit(EntityEvent.Destroyed, damagedRect)
      })
    }
  }
}