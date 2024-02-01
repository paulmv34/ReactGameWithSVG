import { TReaction } from '@/pages/Forum/components/ForumContent/ForumItem/types'
import { END_POINTS_URL } from './types'
import { axiosService } from './axiosService'

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
}
