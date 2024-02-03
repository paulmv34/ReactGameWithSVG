import { UserInfo } from '@/api/Auth/types'
import { ErrorObject } from '@/types/types'

export interface UserState {
  error: ErrorObject | null
  isLoggedIn: boolean | null
  user: null | UserInfo
}
