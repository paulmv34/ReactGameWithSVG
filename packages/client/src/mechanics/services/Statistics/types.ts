import { type EnemyVariant } from '@/mechanics/models/Tank/types'

export type EnemiesKilledState = Record<EnemyVariant, number[]>

export type StatisticsData = {
  matches: number
  score: number
  time: number
}
