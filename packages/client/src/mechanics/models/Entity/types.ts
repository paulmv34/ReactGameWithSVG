import { type Color } from '@/mechanics/services/View/colors'
import { type Bullet } from '../Bullet/Bullet'
import { type EnemyVariant, type PlayerVariant } from '../Tank/types'
import { type TerrainVariant } from '../Terrain/types'

export type EntityRole = 'player' | 'enemy' | 'neutral'

export type EntityType =
  | 'tank'
  | 'bullet'
  | 'flag'
  | 'boundary'
  | 'brickWall'
  | 'concreteWall'
  | 'trees'
  | 'water'
  | 'ice'
  | 'score'
  | 'indicator'
  | 'custom'

export enum Direction {
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
  Up = 'UP',
}

export type Pos = {
  posX: number
  posY: number
}

export type Size = {
  height: number
  width: number
}

export type Rect = Pos & Size

export type PosState = {
  hasCollision: boolean | undefined
  nextRect: Rect
}

export enum EntityEvent {
  AnimationEnded = 'ANIMATION_ENDED',
  AnimationStarted = 'ANIMATION_STARTED',
  ClearLoopInterval = 'CLEAR_LOOP_INTERVAL',
  Damaged = 'DAMAGED',
  Despawn = 'DESPAWN',
  Destroyed = 'DESTROYED',
  DidUpdate = 'ENTITY_DID_UPDATE',
  Exploding = 'EXPLODING',
  Move = 'MOVE',

  Ready = 'READY',
  SetLoopDelay = 'SET_LOOP_DELAY',
  SetLoopInterval = 'SET_LOOP_INTERVAL',

  Shoot = 'SHOOT',
  ShouldBeDestroyed = 'ENTITY_SHOULD_BE_DESTROYED',
  ShouldRenderText = 'ENTITY_SHOULD_RENDER_TEXT',
  ShouldUpdate = 'ENTITY_SHOULD_UPDATE',
  Spawn = 'SPAWN',
  Stop = 'STOP',

  WillDoDamage = 'ENTITY_WILL_DO_DAMAGE',
  WillHaveNewPos = 'ENTITY_WILL_HAVE_NEW_POS',
}

export type EntitySettings = Pos &
  Partial<Size> &
  Partial<{
    color: Color | string
    direction: Direction
    img: HTMLImageElement
    role: EntityRole
    type: EntityType
    variant: TerrainVariant | PlayerVariant | EnemyVariant
  }>

export type DamageSettings = Rect & { source: Bullet }
