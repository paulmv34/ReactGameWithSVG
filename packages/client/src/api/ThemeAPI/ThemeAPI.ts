import { axiosService } from '../axiosService'
import { BASE_URL } from '@/api/types'

class ThemeAPI {
  private readonly baseEndpoint = '/theme'

  get() {
    return axiosService.get(`${BASE_URL}${this.baseEndpoint}`)
  }

  set(themeName: string) {
    return axiosService.post<Promise<string>>(`${BASE_URL}${this.baseEndpoint}`, { themeName })
  }
}

export default new ThemeAPI()
