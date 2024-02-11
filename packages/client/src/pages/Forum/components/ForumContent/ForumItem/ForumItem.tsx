import { FC } from 'react'

import styles from './ForumItem.module.scss'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/types/types'
import { ForumItemProps } from '@/pages/Forum/components/ForumContent/ForumItem/types'
import { formatDate } from '@/utils/formatDate'

const ForumItem: FC<ForumItemProps> = ({ topic }) => {
  const { content, created_at, id, name, section_id } = topic

  return (
    <Link to={`${id}`} className={styles.containerForumItem}>
      <div className={styles.headerContainer}>
        <div>{name}</div>
        <div className={styles.date}>
          {formatDate(created_at)}
          {/*<img src="/images/message.svg" alt="" className={styles.commentsCountIcon} />*/}
          {/*<div>{forum.comments.length}</div>*/}
        </div>
      </div>
      <div className={styles.bodyForum}>{content}</div>
    </Link>
  )
}

export default ForumItem
