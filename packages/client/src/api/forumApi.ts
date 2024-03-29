import { TReaction } from '@/pages/Forum/components/ForumContent/ForumItem/types'
import { axiosService } from './axiosService'

// Types
import { END_POINTS_URL } from './types'
import { CreateTopic, CreateTopicMessage, ForumSection, PartialTopic, Topic, TopicMessage } from '@/types/types'

export const forumApi = {
  addReaction(data: TReaction) {
    const { comment_id, emoji, user_id } = data
    return axiosService.post(`${END_POINTS_URL.ADD_REACTION}/${comment_id}/reactions`, {
      emoji: '0x' + emoji,
      user_id,
    })
  },
  getReactionsByCommentId(comment_id: string) {
    return axiosService.get(`${END_POINTS_URL.ADD_REACTION}/${comment_id}/reactions`)
  },
  getSections() {
    return axiosService.get<ForumSection[]>(`${END_POINTS_URL.FORUM_SECTIONS}`)
  },
  getSection(id: string) {
    return axiosService.get<ForumSection>(`${END_POINTS_URL.FORUM_SECTIONS}/${id}`)
  },
  createTopic(data: CreateTopic) {
    return axiosService.post<CreateTopic>(`${END_POINTS_URL.FORUM_TOPIC}`, data)
  },
  getTopics(sectionId: string) {
    return axiosService.get<PartialTopic[]>(`${END_POINTS_URL.FORUM_TOPIC}?section_id=${sectionId}`)
  },
  getTopic(topicId: string) {
    return axiosService.get<Topic>(`${END_POINTS_URL.FORUM_TOPIC}/${topicId}`)
  },
  createTopicMessage(data: CreateTopicMessage) {
    return axiosService.post<TopicMessage>(`${END_POINTS_URL.TOPIC_MESSAGE}`, data)
  },
}
