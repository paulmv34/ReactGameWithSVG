import { axiosYandexService as axiosService } from '../axiosService'
import type { SignInData, SignUpData, UserInfo, YandexServiceId } from './types'

class AuthAPI {
  private readonly baseEndpoint = '/auth'
  private readonly baseOAuthYandex = '/oauth/yandex'

  signup(data: SignUpData) {
    return axiosService.post(`${this.baseEndpoint}/signup`, data)
  }

  signin(data: SignInData) {
    return axiosService.post(`${this.baseEndpoint}/signin`, data)
  }

  getUser() {
    return axiosService.get<Promise<UserInfo>>(`${this.baseEndpoint}/user`)
  }

  logout() {
    return axiosService.post(`${this.baseEndpoint}/logout`)
  }

  getServiceIdYandex(redirectUri: string) {
    return axiosService.get<YandexServiceId>(`${this.baseOAuthYandex}/service-id?redirect_uri=${redirectUri}`)
  }

  oAuthYandex(data: string) {
    return axiosService.post(`${this.baseOAuthYandex}`, {
      code: data,
      redirect_uri: window.location.origin,
    })
  }
}

export default new AuthAPI()
