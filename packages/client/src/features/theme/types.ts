import { ErrorObject, Themes } from '@/types/types'

export interface State {
  error: ErrorObject | null
  isLoading: boolean
  theme: Themes
}
