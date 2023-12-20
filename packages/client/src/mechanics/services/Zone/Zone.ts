import {
  type Entity,
  type Powerup,
  EntityDynamic,
  Bullet,
  Tank,
  TankPlayer,
} from '../../models'
import {
  type PosState,
  type Rect,
  EntityEvent,
} from '../../models/Entity/types'
import { type Game } from '../'

enum ZoneLayers {
  Main = 0,
  Secondary = 1,
  Bullets = 2,
  Powerups = 3,
}

export class Zone {
  width = 0
  height = 0
  matrix: Array<Array<Array<Entity | null>>>

  constructor(private game: Game) {
    const { height, width } = game.state
    this.width = width
    this.height = height
    this.matrix = []
    for (const z of Object.values(ZoneLayers)) {
      if (typeof z !== 'number') {
        continue
      }
      this.matrix[z] = Array(this.width)
      for (let x = 0; x < this.matrix[z].length; ++x) {
        this.matrix[z][x] = Array(this.height).fill(null)
      }
    }
  }

  getLayerByEntityType(entity: Entity) {
    switch (entity.type) {
      case 'ice':
      case 'trees':
        return ZoneLayers.Secondary
      case 'bullet':
        return ZoneLayers.Bullets
      case 'powerup':
        return ZoneLayers.Powerups
      default:
        return ZoneLayers.Main
    }
  }

  reset() {
    for (let z = 0; z < this.matrix.length; ++z) {
      this.updateMatrix(
        z,
        { posX: 0, posY: 0, width: this.width, height: this.height },
        null
      )
    }
  }

  add(entity: Entity) {
    this.registerEntity(entity)
  }

  updateMatrix(z: number, rect: Rect, value: Entity | null) {
    if (this.isBeyondMatrix(rect) || !this.isLegalRect(rect)) {
      return
    }
    for (let x = rect.posX + rect.width - 1; x >= rect.posX; --x) {
      for (let y = rect.posY + rect.height - 1; y >= rect.posY; --y) {
        this.matrix[z][x][y] = value
      }
    }
  }

  writeEntityToMatrix(entity: Entity) {
    if (entity.alignedToGrid) {
      const layer = this.getLayerByEntityType(entity)
      const rect = entity.getRect()
      this.updateMatrix(layer, rect, entity)
    }
  }

  deleteEntityFromMatrix(entity: Entity | EntityDynamic) {
    const layer = this.getLayerByEntityType(entity)
    if (!(entity instanceof EntityDynamic)) {
      const rect = entity.getRect()
      this.updateMatrix(layer, rect, null)
    } else {
      let rect = entity.lastRect
      if (rect) {
        this.updateMatrix(layer, rect, null)
      } else {
        rect = entity.getRect()
        this.updateMatrix(layer, rect, null)
      }
      if (entity.nextRect) {
        rect = entity.nextRect
        this.updateMatrix(layer, rect, null)
      }
    }
  }

  registerEntity(entity: Entity) {
    if (entity.type === 'score' || entity.type === 'explosion') {
      return
    }

    entity.on(EntityEvent.WillHaveNewPos, (posState: PosState) => {
      const rect = posState.nextRect
      if (this.hasCollision(rect, entity)) {
        posState.hasCollision = true
      } else {
        const layer = this.getLayerByEntityType(entity)
        this.updateMatrix(layer, rect, entity)

        if (entity instanceof Tank && entity.sliding) {
          entity.sliding = this.shouldSlide(rect)
        }
      }
    })

    entity.on(EntityEvent.ShouldUpdate, (newState: Partial<Entity>) => {
      if (!newState || !('posX' in newState) || !('posY' in newState)) {
        return
      }
      if (!entity.spawned) {
        return
      }
      this.deleteEntityFromMatrix(entity)
    })

    entity.on(EntityEvent.DidUpdate, (newState: Partial<Entity>) => {
      if (!newState || !('posX' in newState) || !('posY' in newState)) {
        return
      }
      this.writeEntityToMatrix(entity)
    })

    entity.on(EntityEvent.ShouldBeDestroyed, () => {
      this.deleteEntityFromMatrix(entity)
    })

    entity.on(EntityEvent.WillDoDamage, (rect: Rect) => {
      if (entity instanceof Bullet) {
        this.doAreaDamage(rect, entity)
      }
    })

    if (entity instanceof Tank) {
      entity.on(EntityEvent.Stop, () => {
        entity.slide(
          this.shouldSlide(
            entity.nextRect || entity.lastRect || entity.getRect()
          )
        )
      })
    }

    if (entity.type === 'brickWall' || entity.type === 'concreteWall') {
      entity.on(EntityEvent.Destroyed, (rect: Rect) => {
        const layer = this.getLayerByEntityType(entity)
        this.updateMatrix(layer, rect, null)
      })
    }
  }

  isLegalRect(rect: Rect) {
    if (
      rect.posX % 1 === 0 &&
      rect.posY % 1 === 0 &&
      rect.width % 1 === 0 &&
      rect.height % 1 === 0
    ) {
      return true
    }
    return false
  }

  isBeyondMatrix(rect: Rect) {
    if (this.isBeyondXAxis(rect) || this.isBeyondYAxis(rect)) {
      return true
    }
    return false
  }

  isBeyondXAxis(rect: Rect) {
    const offsetX = rect.posX + rect.width
    if (rect.posX < 0 || offsetX > this.width) {
      return true
    }
    return false
  }

  isBeyondYAxis(rect: Rect) {
    const offsetY = rect.posY + rect.height
    if (rect.posY < 0 || offsetY > this.height) {
      return true
    }
    return false
  }

  doAreaDamage(rect: Rect, source: Bullet | TankPlayer | Powerup) {
    for (let x = rect.posX + rect.width - 1; x >= rect.posX; --x) {
      for (let y = rect.posY + rect.height - 1; y >= rect.posY; --y) {
        const mainLayerCell = this.matrix[ZoneLayers.Main][x]?.[y]
        const bulletLayerCell = this.matrix[ZoneLayers.Bullets][x]?.[y]
        const damagedRect = { posX: x, posY: y, width: 1, height: 1 }
        if (mainLayerCell && mainLayerCell.hittable) {
          if (!(source instanceof Bullet) || mainLayerCell !== source.parent) {
            if (
              mainLayerCell.type !== 'tank' ||
              this.currentRectsOverlap(source, mainLayerCell)
            ) {
              mainLayerCell.takeDamage(source, damagedRect)
            }
          }
        }
        if (bulletLayerCell) {
          bulletLayerCell.takeDamage(source, damagedRect)
        }
      }
    }
  }

  shouldSlide(rect: Rect) {
    for (let x = rect.posX + rect.width - 1; x >= rect.posX; --x) {
      for (let y = rect.posY + rect.height - 1; y >= rect.posY; --y) {
        const secondaryLayerCell = this.matrix[ZoneLayers.Secondary][x]?.[y]
        if (!secondaryLayerCell || secondaryLayerCell.type !== 'ice') {
          return false
        }
      }
    }
    return true
  }

  hasCollisionsWithMatrix(rect: Rect, entity: Entity) {
    for (let x = rect.posX + rect.width - 1; x >= rect.posX; --x) {
      for (let y = rect.posY + rect.height - 1; y >= rect.posY; --y) {
        const mainLayerCell = this.matrix[ZoneLayers.Main][x]?.[y]
        const bulletLayerCell = this.matrix[ZoneLayers.Bullets][x]?.[y]
        const powerupLayerCell = this.matrix[ZoneLayers.Powerups][x]?.[y]

        if (!mainLayerCell && !bulletLayerCell && !powerupLayerCell) {
          continue
        }
        if (entity instanceof Tank) {
          if (
            mainLayerCell !== null &&
            mainLayerCell !== entity &&
            !mainLayerCell.crossable
          ) {
            return true
          }
          if (powerupLayerCell !== null && entity instanceof TankPlayer) {
            const damagedRect = { posX: x, posY: y, width: 1, height: 1 }
            powerupLayerCell.takeDamage(entity, damagedRect)
          }
        }
        if (entity instanceof Bullet) {
          if (
            mainLayerCell !== null &&
            mainLayerCell.hittable &&
            mainLayerCell !== entity.parent
          ) {
            if (entity.role === 'enemy' && entity.role === mainLayerCell.role) {
              continue
            }
            if (mainLayerCell.type === 'tank') {
              if (this.currentRectsOverlap(entity, mainLayerCell)) {
                const damagedRect = { posX: x, posY: y, width: 1, height: 1 }
                entity.explode()
                mainLayerCell.takeDamage(entity, damagedRect)
                return true
              } else {
                continue
              }
            }
            return true
          }
          if (bulletLayerCell !== null && bulletLayerCell !== entity) {
            if (
              entity.role === 'enemy' &&
              entity.role === bulletLayerCell.role
            ) {
              continue
            }
            return true
          }
        }
      }
    }
    return false
  }

  currentRectsOverlap(
    rectOne: Entity | Rect,
    rectTwo: Entity | Rect,
    margin = 0.25
  ) {
    const rectOneStartX = rectOne.posX + margin
    const rectOneEndX = rectOne.posX + rectOne.width - margin
    const rectOneStartY = rectOne.posY + margin
    const rectOneEndY = rectOne.posY + rectOne.height - margin

    const rectTwoStartX = rectTwo.posX + margin
    const rectTwoEndX = rectTwo.posX + rectTwo.width - margin
    const rectTwoStartY = rectTwo.posY + margin
    const rectTwoEndY = rectTwo.posY + rectTwo.height - margin

    const rectOneRightOfRectTwo = rectOneStartX >= rectTwoEndX
    const rectOneLeftOfRectTwo = rectOneEndX <= rectTwoStartX
    const rectOneBottomOfRectTwo = rectOneStartY >= rectTwoEndY
    const rectOneTopOfRectTwo = rectOneEndY <= rectTwoStartY

    return !(
      rectOneRightOfRectTwo ||
      rectOneLeftOfRectTwo ||
      rectOneBottomOfRectTwo ||
      rectOneTopOfRectTwo
    )
  }

  hasCollision(rect: Rect, entity: Entity) {
    if (
      this.isBeyondMatrix(rect) ||
      this.hasCollisionsWithMatrix(rect, entity)
    ) {
      return true
    }
    return false
  }
}
