import { type Entity, Tank } from '@/mechanics/models'
import { SpriteName } from '../Resources/data'
import { type Rect, EntityEvent } from '@/mechanics/models/Entity/types'
import { UIElement } from '@/mechanics/ui'
import { EventEmitter } from '@/mechanics/utils'
import { type Game, ResourcesEvent } from '..'
import { Color } from './colors'
import {
  type AnimationSettings,
  type GetSpriteCoordinates,
  type LayerEntity,
  type LayerList,
  type LayerObject,
} from './types'

export class View extends EventEmitter {
  width = 0
  height = 0
  pixelRatio = 10
  gameBgColor = Color.Black
  layerZIndexCount = 0
  layers: LayerList = {}
  root!: HTMLElement
  floorLayer!: HTMLCanvasElement
  spriteImg: HTMLImageElement | null = null

  constructor(private game: Game) {
    super()
    const { height, width } = this.game.state
    this.width = width
    this.height = height
    this.pixelRatio = this.getPixelRatio()

    this.game.resources?.on(ResourcesEvent.Loaded, () => {
      this.spriteImg = this.game.resources.getImage(SpriteName.Sprite)
    })
  }

  reset() {
    for (const id of Object.keys(this.layers)) {
      this.eraseAllEntitiesOnLayer(id)
    }
  }

  load(root: HTMLElement | null) {
    if (root === null) {
      throw new Error('proper DOM root for the game should be set')
    }
    this.root = root
    if (this.isRootEmpty()) {
      this.floorLayer = this.createLayer('floor')
      this.floorLayer.style.background = Color.Black
      this.createLayer('tanks')
      this.createLayer('bullets')
      this.createLayer('ceiling')
      this.createLayer('explosions')
      this.createLayer('overlay').style.position = 'relative'
    }

    window.addEventListener('resize', this.canvasResizeHandler)
  }

  unload() {
    window.removeEventListener('resize', this.canvasResizeHandler)
  }

  createLayer(id: string) {
    const layer = document.createElement('canvas')
    layer.id = id
    layer.width = this.convertToPixels(this.width)
    layer.height = this.convertToPixels(this.height)
    layer.style.display = 'block'
    layer.style.position = 'absolute'
    layer.style.zIndex = (this.layerZIndexCount++).toString()
    this.root.appendChild(layer)
    if (this.layers[id]) {
      this.layers[id].context = layer.getContext(
        '2d'
      ) as CanvasRenderingContext2D
      this.redrawAllEntitiesOnLayer(id)
    } else {
      this.layers[id] = {
        context: layer.getContext('2d') as CanvasRenderingContext2D,
        entities: new Set(),
      }
    }
    return layer
  }

  add(entity: Entity | UIElement) {
    let layer = ''
    switch (entity.type) {
      case 'custom':
      case 'score':
        layer = 'overlay'
        break
      case 'tank':
        layer = 'tanks'
        break
      case 'bullet':
        layer = 'bullets'
        break
      case 'trees':
      case 'indicator':
        layer = 'ceiling'
        break
      case 'explosion':
        layer = 'explosions'
        break
      default:
        layer = 'floor'
        break
    }
    this.bindEntityToLayer(entity, layer)
  }

  bindEntityToLayer(entity: Entity | UIElement, layerId: keyof LayerList) {
    const layerObject: LayerObject<Entity | UIElement> = {
      instance: entity,
      listeners: {
        [EntityEvent.ShouldUpdate]: () => {
          if (!entity.spawned) {
            return
          }
          this.eraseFromLayer(entity, layerId)
        },
        [EntityEvent.DidUpdate]: () => {
          this.drawOnLayer(entity, layerId)
        },
        [EntityEvent.ShouldRenderText]: () => {
          if (entity instanceof UIElement) {
            this.drawTextOnLayer(entity, layerId)
          }
        },
        [EntityEvent.ShouldBeDestroyed]: () => {
          this.eraseFromLayer(entity, layerId)
          this.removeEntityFromLayer(entity, layerId)
        },
        [EntityEvent.Destroyed]: (rect: Rect) => {
          if (entity.type === 'brickWall' || entity.type === 'concreteWall') {
            this.eraseFromLayer(rect, layerId)
          }
        },
      },
    }
    this.layers[layerId]?.entities.add(layerObject)

    for (const [eventName, callback] of Object.entries(layerObject.listeners)) {
      entity.on(eventName as EntityEvent, callback)
    }
  }

  removeEntityFromLayer(entity: Entity, layerId: keyof LayerList) {
    let entityToDelete: LayerEntity | null = null

    for (const layerEntity of this.layers[layerId].entities) {
      if (layerEntity.instance === entity) {
        entityToDelete = layerEntity
      }
    }

    if (entityToDelete) {
      this.layers[layerId].entities.delete(entityToDelete)
      for (const [eventName, callback] of Object.entries(
        entityToDelete.listeners
      )) {
        entity.off(eventName as EntityEvent, callback)
      }
    }
  }

  drawTextOnLayer(elem: UIElement, layerId: keyof LayerList) {
    const context = this.layers[layerId].context
    context.font = `${this.convertToPixels(elem.height) - 1}px "Press Start 2P"`
    context.textAlign = elem.align
    context.textBaseline = 'top'
    if (elem.backImg) {
      const pattern = context.createPattern(elem.backImg, 'repeat')
      if (pattern !== null) {
        context.fillStyle = pattern
      }
    } else {
      context.fillStyle = elem.color
    }
    let posX = elem.posX
    if (elem.align === 'center') {
      posX += Math.round(elem.width / 2)
    }
    if (elem.align === 'right') {
      posX += elem.width
    }
    context.fillText(
      elem.text,
      this.convertToPixels(posX),
      this.convertToPixels(elem.posY) + 1
    )
  }

  drawOnLayer(entity: Entity, layerId: keyof LayerList) {
    const context = this.layers[layerId].context

    if (!entity.mainSpriteCoordinates || !this.isSpriteImgLoaded()) {
      if (entity.color) {
        context.fillStyle = entity.color
        context.fillRect(...this.getActualRect(entity))
      }
      return
    }

    if (entity.backColor || entity.backImg) {
      if (entity.backColor) {
        context.fillStyle = entity.backColor
      }

      if (entity.backImg) {
        const pattern = context.createPattern(entity.backImg, 'repeat')
        if (pattern !== null) {
          context.fillStyle = pattern
        }
      }

      context.fillRect(...this.getActualRect(entity))
    }

    if (!entity.animationList?.length) {
      this.drawMainEntitySprite(entity, context)
      return
    }

    if (entity.animationList.length) {
      entity.animationList.forEach((animation) => {
        const spriteCoordinates = this.getSpriteCoordinates({
          entity,
          animation,
        })

        if (!spriteCoordinates || this.spriteImg === null) {
          return
        }

        if (animation.showMainSprite) {
          this.drawMainEntitySprite(entity, context)
        }

        context.drawImage(
          this.spriteImg,
          spriteCoordinates[0],
          spriteCoordinates[1],
          spriteCoordinates[2],
          spriteCoordinates[3],
          ...this.getActualRect(entity)
        )
        this.setNextSpriteFrame(animation, entity)
      })
    }
  }

  drawMainEntitySprite(entity: Entity, context: CanvasRenderingContext2D) {
    const spriteCoordinates = this.getSpriteCoordinates({ entity })

    if (!spriteCoordinates || this.spriteImg === null) {
      return
    }

    context.drawImage(
      this.spriteImg,
      spriteCoordinates[0],
      spriteCoordinates[1],
      spriteCoordinates[2],
      spriteCoordinates[3],
      ...this.getActualRect(entity)
    )
  }

  eraseFromLayer(rect: Rect | Entity, layerId: keyof LayerList) {
    const context = this.layers[layerId].context
    context.clearRect(...this.getActualRect(rect))
  }

  redrawAllEntitiesOnLayer(layerId: keyof LayerList) {
    if (!this.layers[layerId]) {
      return
    }

    const { entities: objects } = this.layers[layerId]
    this.eraseAllEntitiesOnLayer(layerId)

    for (const layerObject of objects) {
      this.drawOnLayer(layerObject.instance, layerId)
    }
  }

  eraseAllEntitiesOnLayer(layerId: keyof LayerList) {
    if (!this.layers[layerId]) {
      return
    }
    const { context } = this.layers[layerId]
    context.clearRect(
      0,
      0,
      this.convertToPixels(this.width),
      this.convertToPixels(this.height)
    )
    this.layers[layerId].entities.clear()
  }

  getActualRect(item: Entity | Rect) {
    let correctTankPos = 0
    let correctTankSize = 0

    if ('type' in item && item.type === 'tank') {
      correctTankPos = 2
      correctTankSize = -4
    }

    return [
      this.convertToPixels(item.posX, correctTankPos),
      this.convertToPixels(item.posY, correctTankPos),
      this.convertToPixels(item.width, correctTankSize),
      this.convertToPixels(item.height, correctTankSize),
    ] as const
  }

  getSpriteCoordinates({ animation, entity }: GetSpriteCoordinates) {
    let spriteCoordinates: number[] | null = null

    if (!animation && entity.mainSpriteCoordinates) {
      if (!entity.movable && Array.isArray(entity.mainSpriteCoordinates)) {
        return entity.mainSpriteCoordinates[0]
      }

      if (entity.movable && !Array.isArray(entity.mainSpriteCoordinates)) {
        const isIdleTank = entity instanceof Tank && !entity.moving
        if (!isIdleTank) {
          entity.mainSpriteFrame = +!entity.mainSpriteFrame
        }
        return entity.mainSpriteCoordinates[entity.direction][
          entity.mainSpriteFrame
        ]
      }
    }

    if (animation && Array.isArray(animation.spriteCoordinates)) {
      spriteCoordinates =
        animation.spriteCoordinates[animation.spriteFrame || 0]

      return spriteCoordinates
    }
  }

  setNextSpriteFrame(animation: AnimationSettings, entity: Entity) {
    const time = performance.now()
    if (!animation.lastTime) {
      animation.lastTime = time
    }
    const elapsed = time - animation.lastTime

    if (
      typeof animation.spriteFrame !== 'number' ||
      elapsed < animation.delay
    ) {
      return
    }

    animation.lastTime = time
    animation.spriteFrame++

    const isFinishFrame =
      animation.spriteFrame === animation.spriteCoordinates?.length

    if (isFinishFrame && animation.looped) {
      animation.spriteFrame = 0
    }

    if (isFinishFrame && !animation.looped && animation.name) {
      entity.cancelAnimation('eraseEntity', animation.name)
    }
  }

  private isRootEmpty() {
    return this.root.innerHTML.trim() === ''
  }

  private convertToPixels(value: number, correction = 0) {
    return Math.round(value * this.pixelRatio + correction)
  }

  private getPixelRatio() {
    const resizeStep = 0.5

    let pixelRatioWidth = window.innerWidth / this.width

    let isCanvasHeightBiggerThanWindow =
      pixelRatioWidth * this.height > window.innerHeight

    while (isCanvasHeightBiggerThanWindow) {
      pixelRatioWidth -= resizeStep
      isCanvasHeightBiggerThanWindow =
        pixelRatioWidth * this.height > window.innerHeight
    }

    return Math.floor(pixelRatioWidth / resizeStep) * resizeStep
  }

  canvasResizeHandler = () => {
    if (
      !(this.root.firstChild instanceof HTMLCanvasElement) ||
      !this.root.firstChild.width
    ) {
      return
    }

    const currentWidth = this.root.firstChild.width
    const requiredWidth = this.width * this.getPixelRatio()

    const scaleRatio = requiredWidth / currentWidth

    this.root.style.transform = 'scale(' + scaleRatio * 100 + '%)'
  }

  isSpriteImgLoaded() {
    return (
      this.spriteImg instanceof HTMLImageElement &&
      this.spriteImg.complete &&
      this.spriteImg.width > 0 &&
      this.spriteImg.height > 0
    )
  }
}
