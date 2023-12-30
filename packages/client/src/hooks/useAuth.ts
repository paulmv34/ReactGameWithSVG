import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'

import AuthService from '@/services/auth.service'
import { SignInData, SignUpData } from '@/api/Auth/types'
import { fetchUser } from '@/features/user/userSlice'

export const useAuth = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const signUp = async (data: SignUpData) => {
    await AuthService.register(data)
    dispatch(fetchUser())
  }

  const signIn = async (data: SignInData) => {
    await AuthService.login(data)
    dispatch(fetchUser())
  }

  const logout = async () => {
    await AuthService.logout()
    dispatch(fetchUser())
  }

  return {
    isLoggedIn,
    signIn,
    signUp,
    logout,
  }
}
