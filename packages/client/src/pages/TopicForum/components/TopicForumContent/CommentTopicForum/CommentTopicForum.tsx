import { FC } from 'react'
import { CommentTopicForumProps } from './types'

import styles from './CommentTopicForum.module.scss'
import { Avatar } from '@mui/material'

const CommentTopicForum: FC<CommentTopicForumProps> = ({ comment }: CommentTopicForumProps) => {
  return (
    <div className={styles.container}>
      <div>
        <Avatar variant="square" />
      </div>
      <div className={styles.containerComment}>
        <div>{comment.nameAuthor}</div>
        <div className={styles.bodyComment}>{comment.bodyComment}</div>
        <div className={styles.dateComment}>
          {comment.dateComment}
          <div className={styles.commentsCountIcon}></div>
          <div>Ответить</div>
        </div>
      </div>
    </div>
  )
}

export default CommentTopicForum
