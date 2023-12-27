import { UserInfo } from '@/api/Auth/types'

export interface UserState {
  error: any
  isLoggedIn: boolean
  user: null | UserInfo
}
