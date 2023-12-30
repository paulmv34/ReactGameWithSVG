import AuthAPI from '@/api/Auth/AuthAPI'
import { SignInData, SignUpData } from '@/api/Auth/types'
import { handleError } from '@/utils/handleError'

class AuthService {
  async register(data: SignUpData) {
    try {
      await AuthAPI.signup(data)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async login(data: SignInData) {
    try {
      await AuthAPI.signin(data)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async logout() {
    try {
      await AuthAPI.logout()
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new AuthService()
