import { UserInfo } from '@/api/Auth/types'

export interface UserState {
  error: {
    code: number
    message: string
  } | null
  isLoggedIn: boolean
  user: null | UserInfo
}
