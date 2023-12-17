import { type EntityDynamicSettings } from '../EntityDynamic/types'

export type PlayerVariant = 'PLAYER1' | 'PLAYER2'

export type EnemyVariant = 'BASIC' | 'FAST' | 'POWER' | 'ARMOR'

export type TankPlayerSettings = {
  upgradeTier?: number
} & Partial<EntityDynamicSettings>

export type TankEnemySettings = {
  variant: EnemyVariant
} & Partial<EntityDynamicSettings>
