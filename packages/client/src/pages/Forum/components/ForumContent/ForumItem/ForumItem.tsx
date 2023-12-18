import { FC } from 'react'
import { ForumItemProps } from './types'

import styles from './ForumItem.module.scss'
import { Link } from 'react-router-dom'

const ForumItem: FC<ForumItemProps> = ({ forum }: ForumItemProps) => {
  return (
    <Link to={`/forum/${forum.id}`} className={styles.containerForumItem}>
      <div>{forum.titleForum}</div>
      <div className={styles.bodyForum}>{forum.bodyForum}</div>
      <div className={styles.forumDate}>
        {forum.dateForum}
        <div className={styles.commentsCountIcon}></div>
        <div>{forum.comments.length}</div>
      </div>
    </Link>
  )
}

export default ForumItem
