import { handleError } from '@/utils/handleError'
import { AxiosResponse } from 'axios'
import ThemeAPI from '@/api/ThemeAPI/ThemeAPI'

class ThemeService {
  async getTheme(userId: number): Promise<string> {
    try {
      const response: AxiosResponse<Promise<string>> = await ThemeAPI.get(userId)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async setTheme(userId: number, themeName: string): Promise<string> {
    try {
      const response: AxiosResponse<Promise<string>> = await ThemeAPI.set(userId, themeName)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new ThemeService()
