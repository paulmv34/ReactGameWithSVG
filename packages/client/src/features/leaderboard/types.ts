import { ErrorObject, LeaderboardResponseItem } from '@/types/types'

export interface State {
  error: ErrorObject | null
  isLoading: boolean
  records: LeaderboardResponseItem[]
}
