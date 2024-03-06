import { axiosService } from '../axiosService'

class ThemeAPI {
  private readonly baseEndpoint = '/theme'

  get(userId: number) {
    return axiosService.get(`${this.baseEndpoint}?user_id=${userId}`)
  }

  set(userId: number, themeName: string) {
    return axiosService.post<Promise<string>>(`${this.baseEndpoint}?user_id=${userId}`, { themeName })
  }
}

export default new ThemeAPI()
