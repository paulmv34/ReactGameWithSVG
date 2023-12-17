import { FC } from 'react'
import { TopicForumProps } from '../../types'

import styles from './TopicForumHeader.module.scss'

const TopicForumHeader: FC<TopicForumProps> = ({ forum }: TopicForumProps) => {
  return (
    <div className={styles.headerContainer}>
      <div>{forum.titleForum}</div>
      <div>{forum.auhtorForum}</div>
    </div>
  )
}

export default TopicForumHeader
