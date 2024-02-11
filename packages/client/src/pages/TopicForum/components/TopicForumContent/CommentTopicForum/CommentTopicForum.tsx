import { FC } from 'react'
import { CommentTopicForumProps } from './types'
import { Avatar } from '@mui/material'
import ForumEmoji from '@/components/ForumEmoji/ForumEmoji'

import styles from './CommentTopicForum.module.scss'
import { formatDate } from '@/utils/formatDate'

const CommentTopicForum: FC<CommentTopicForumProps> = ({ comment }) => {
  const { content, created_at, user } = comment
  return (
    <div className={styles.container}>
      <div>
        <Avatar variant="square" className={styles.avatar} />
      </div>
      <div className={styles.containerComment}>
        <div className={styles.header}>
          <div>{`${user.display_name || ''} (${user.login})`}</div>
          <div className={styles.dateComment}>
            {formatDate(created_at)}
            {/*<img src="/images/message.svg" alt="" className={styles.commentsCountIcon} />*/}
            {/*<div>Ответить</div>*/}
          </div>
        </div>
        <div className={styles.bodyComment}>{content}</div>
        <ForumEmoji comment={comment} />
      </div>
    </div>
  )
}

export default CommentTopicForum
