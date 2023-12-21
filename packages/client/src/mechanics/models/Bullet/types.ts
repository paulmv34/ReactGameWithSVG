import { type Tank } from '..'
import { type EntityDynamicSettings } from '../EntityDynamic/types'

export type BulletSettings = EntityDynamicSettings & {
  explosionForce?: number
  parent: Tank
}
