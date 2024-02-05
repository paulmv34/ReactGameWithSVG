import { FC } from 'react'
import { CommentTopicForumProps } from './types'
import { Avatar } from '@mui/material'
import ForumEmoji from '@/components/ForumEmoji/ForumEmoji'

import styles from './CommentTopicForum.module.scss'

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
            <img src="/images/message.svg" alt="" className={styles.commentsCountIcon} />
            <div>Ответить</div>
          </div>
        </div>
        <div className={styles.bodyComment}>{comment.body}</div>
        <ForumEmoji comment={comment} />
      </div>
    </div>
  )
}

export default CommentTopicForum
