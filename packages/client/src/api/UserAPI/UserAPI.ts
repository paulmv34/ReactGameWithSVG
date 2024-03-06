import { axiosService } from '../axiosService'
import { UserInfo } from '@/api/Auth/types'

class UserAPI {
  private readonly baseEndpoint = '/user'

  set(user: UserInfo) {
    const { avatar, display_name, id, login } = user
    return axiosService.post<Promise<string>>(`${this.baseEndpoint}`, { id, login, display_name, avatar })
  }
}

export default new UserAPI()
