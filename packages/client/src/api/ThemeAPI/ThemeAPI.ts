import { axiosService } from '../axiosService'

class ThemeAPI {
  private readonly baseEndpoint = '/theme'

  get() {
    return axiosService.get(`${this.baseEndpoint}`)
  }

  set(themeName: string) {
    return axiosService.post<Promise<string>>(`${this.baseEndpoint}`, { themeName })
  }
}

export default new ThemeAPI()
