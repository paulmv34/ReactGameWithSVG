import AuthAPI from '@/api/Auth/AuthAPI'
import { SignInData, SignUpData } from '@/api/Auth/types'
import store from '@/store/store'
import { handleError } from '@/utils/handleError'

class AuthService {
  async register(data: SignUpData) {
    try {
      await AuthAPI.signup(data)
      store.set('isLoggedIn', true)
      await this.getUserInfo()
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async login(data: SignInData) {
    try {
      await AuthAPI.signin(data)
      store.set('isLoggedIn', true)
      await this.getUserInfo()
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async logout() {
    try {
      await AuthAPI.logout()
      store.set('user', null)
      store.set('isLoggedIn', false)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async getUserInfo() {
    try {
      const { data: user } = await AuthAPI.getUser()
      store.set('user', user)
    } catch (error) {
      store.set('user', null)
      store.set('isLoggedIn', false)
      throw error
    }
  }
}

export default new AuthService()
