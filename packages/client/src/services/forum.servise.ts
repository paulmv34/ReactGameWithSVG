import { handleError } from '@/utils/handleError'
import { forumApi } from '@/api/forumApi'

class ForumService {
  async getSectionsData() {
    try {
      const { data } = await forumApi.getSections()
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async getSectionData(id: string) {
    try {
      const { data } = await forumApi.getSectionsById(id)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async createTopic() {
    try {
      const body = {
        name: 'Тестовый топик',
        section_id: 1,
        content: 'Контент топика',
      }
      const { data } = await forumApi.createTopic(body)
      console.log(data)
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new ForumService()
