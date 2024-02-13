import { handleError } from '@/utils/handleError'
import { AxiosResponse } from 'axios'
import ThemeAPI from '@/api/ThemeAPI/ThemeAPI'

class ThemeService {
  async getTheme(): Promise<string> {
    try {
      const response: AxiosResponse<Promise<string>> = await ThemeAPI.get()
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async setTheme(themeName: string): Promise<string> {
    try {
      const response: AxiosResponse<Promise<string>> = await ThemeAPI.set(themeName)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new ThemeService()
