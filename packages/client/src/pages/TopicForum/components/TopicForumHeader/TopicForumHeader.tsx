import { FC } from 'react'
import { TopicForumProps } from '../../types'

import styles from './TopicForumHeader.module.scss'
import Title from '@/components/Title/Title'

const TopicForumHeader: FC<TopicForumProps> = ({ forum }: TopicForumProps) => {
  return (
    <div className={styles.headerContainer}>
      <Title title={`Тема: ${forum.title}`} />
      <div>{forum.author}</div>
    </div>
  )
}

export default TopicForumHeader
