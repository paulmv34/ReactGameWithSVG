import { FC } from 'react'
import { CommentTopicForumProps } from './types'

import styles from './CommentTopicForum.module.scss'

const CommentTopicForum: FC<CommentTopicForumProps> = ({ comment }: CommentTopicForumProps) => {
  return (
    <div className={styles.containerComment}>
      <div>{comment.nameAuthor}</div>
      <div>{comment.bodyComment}</div>
      <div className={styles.dateComment}>{comment.dateComment}</div>
    </div>
  )
}

export default CommentTopicForum
