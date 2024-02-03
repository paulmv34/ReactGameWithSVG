import AuthAPI from '@/api/Auth/AuthAPI'
import { SignInData, SignUpData } from '@/api/Auth/types'
import { handleError } from '@/utils/handleError'
import authAPI from '@/api/Auth/AuthAPI'

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

  async oAuthYandexRequestAccess() {
    try {
      const { origin } = window.location
      const { data } = await AuthAPI.getServiceIdYandex(origin)

      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${origin}`
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async oAuthYandexHandlerLogin(oAuthCode: string) {
    try {
      await authAPI.oAuthYandex(oAuthCode)
      window.location.href = window.location.origin
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new AuthService()
