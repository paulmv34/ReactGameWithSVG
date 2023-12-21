import { type Tank } from '..'
import { type EntityDynamicSettings } from '../EntityDynamic/types'

export type BulletSettings = EntityDynamicSettings & { parent: Tank }
