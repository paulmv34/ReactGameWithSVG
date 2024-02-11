import { handleError } from '@/utils/handleError'
import { forumApi } from '@/api/forumApi'
import { CreateTopic, CreateTopicMessage } from '@/types/types'

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
      const { data } = await forumApi.getSection(id)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async createTopic(body: CreateTopic) {
    try {
      await forumApi.createTopic(body)
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async getTopicsFromSection(sectionId: number) {
    try {
      const { data } = await forumApi.getTopics(sectionId)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async getTopicById(topicId: string) {
    try {
      const { data } = await forumApi.getTopic(topicId)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async createTopicMessageById(body: CreateTopicMessage) {
    try {
      const { data } = await forumApi.createTopicMessage(body)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new ForumService()
