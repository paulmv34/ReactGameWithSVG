import { axiosService } from '../axiosService'
import { SignInData, SignUpData, UserInfo } from './types'

class AuthAPI {
  private readonly baseEndpoint = '/auth'

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
    return axiosService.get<{ service_id: string }>(`/oauth/yandex/service-id?redirect_uri=${redirectUri}`)
  }

  oAuthYandex(data: string) {
    return axiosService.post(`/oauth/yandex`, {
      code: data,
      redirect_uri: window.location.origin,
    })
  }
}

export default new AuthAPI()
