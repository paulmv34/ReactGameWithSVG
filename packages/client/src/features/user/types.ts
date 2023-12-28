import { UserInfo } from '@/api/Auth/types'

export interface UserState {
  error: ErrorObject | null
  isLoggedIn: boolean | null
  user: null | UserInfo
}

export interface ErrorObject {
  code: number
  message: string
}
