import { FC } from 'react'
import { TopicForumHeaderProps } from '../../types'

import styles from './TopicForumHeader.module.scss'
import Title from '@/components/Title/Title'

const TopicForumHeader: FC<TopicForumHeaderProps> = ({ topic }) => {
  return (
    <div className={styles['header-container']}>
      <div className={styles['top']}>
        <Title title={`${topic.name}`} />
        <div>{`Автор: ${topic.user.display_name}`}</div>
      </div>
      <div className={styles['bottom']}>{topic.content}</div>
    </div>
  )
}

export default TopicForumHeader
