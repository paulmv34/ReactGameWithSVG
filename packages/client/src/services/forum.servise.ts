import { handleError } from '@/utils/handleError'
import { forumApi } from '@/api/forumApi'
import { CreateTopic, CreateTopicMessage } from '@/types/types'

class ForumService {
  async getSectionsData(userId: number) {
    try {
      const { data } = await forumApi.getSections(userId)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async getSectionData(userId: number, id: string) {
    try {
      const { data } = await forumApi.getSection(userId, id)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async createTopic(userId: number, body: CreateTopic) {
    try {
      await forumApi.createTopic(userId, body)
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async getTopicsFromSection(userId: number, sectionId: string) {
    try {
      const { data } = await forumApi.getTopics(userId, sectionId)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async getTopicById(userId: number, topicId: string) {
    try {
      const { data } = await forumApi.getTopic(userId, topicId)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
  async createTopicMessageById(userId: number, body: CreateTopicMessage) {
    try {
      const { data } = await forumApi.createTopicMessage(userId, body)
      return data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new ForumService()
