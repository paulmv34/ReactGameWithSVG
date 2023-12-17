import { type EntitySettings } from '../Entity/types'

export type EntityDynamicSettings = EntitySettings &
  Partial<{
    moveSpeed: number
  }>
