import { FC } from 'react'
import { CommentTopicForumProps } from './types'

import styles from './CommentTopicForum.module.scss'
import { Avatar } from '@mui/material'

const CommentTopicForum: FC<CommentTopicForumProps> = ({ comment }: CommentTopicForumProps) => {
  return (
    <div className={styles.container}>
      <div>
        <Avatar variant="square" className={styles.avatar} />
      </div>
      <div className={styles.containerComment}>
        <div className={styles.header}>
          <div>{comment.author}</div>
          <div className={styles.dateComment}>
            {comment.date}
            <img src="/message.svg" alt="" className={styles.commentsCountIcon} />
            <div>Ответить</div>
          </div>
        </div>
        <div className={styles.bodyComment}>{comment.body}</div>
      </div>
    </div>
  )
}

export default CommentTopicForum
