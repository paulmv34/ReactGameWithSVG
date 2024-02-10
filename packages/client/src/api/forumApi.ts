import { TReaction } from '@/pages/Forum/components/ForumContent/ForumItem/types'
import { axiosService, axiosServiceLocal } from './axiosService'

// Types
import { END_POINTS_URL } from './types'
import { ForumSection } from '@/types/types'

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
    return axiosServiceLocal.get<ForumSection[]>(`${END_POINTS_URL.GET_FORUM_SECTIONS}`)
  },
}
