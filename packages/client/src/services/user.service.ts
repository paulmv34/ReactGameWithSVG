import { handleError } from '@/utils/handleError'
import { AxiosResponse } from 'axios'
import UserAPI from '@/api/UserAPI/UserAPI'
import { UserInfo } from '@/api/Auth/types'

class UserService {
  async set(user: UserInfo): Promise<string> {
    try {
      const response: AxiosResponse<Promise<string>> = await UserAPI.set(user)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new UserService()
