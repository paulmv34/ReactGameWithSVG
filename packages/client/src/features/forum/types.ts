import { ErrorObject, ForumSection } from '@/types/types'

export interface State {
  error: ErrorObject | null
  isLoading: boolean
  sections: ForumSection[]
}
