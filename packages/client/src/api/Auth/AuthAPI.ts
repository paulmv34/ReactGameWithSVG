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
}

export default new AuthAPI()
