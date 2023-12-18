import { FC } from 'react'
import { ForumItemProps } from './types'

import styles from './ForumItem.module.scss'
import { Link } from 'react-router-dom'

const ForumItem: FC<ForumItemProps> = ({ forum }: ForumItemProps) => {
  return (
    <Link to={`/forum/${forum.id}`} className={styles.containerForumItem}>
      <div>{forum.title}</div>
      <div className={styles.bodyForum}>{forum.body}</div>
      <div className={styles.date}>
        {forum.date}
        <img src="/message.svg" alt="" className={styles.commentsCountIcon} />
        <div>{forum.comments.length}</div>
      </div>
    </Link>
  )
}

export default ForumItem
