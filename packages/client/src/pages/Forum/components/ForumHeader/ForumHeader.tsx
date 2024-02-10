import Button from '@/components/Button/Button'
import { FC } from 'react'

import styles from './ForumHeader.module.scss'
import { Link } from 'react-router-dom'
import Title from '@/components/Title/Title'
import { ROUTES } from '@/types/types'
import { ForumHeaderProps } from '@/pages/Forum/components/ForumHeader/types'

const ForumHeader: FC<ForumHeaderProps> = ({ title }) => {
  return (
    <div className={styles.containerForumHeader}>
      <Title title={title} />
      <Link to={ROUTES.FORUM_TOPIC_NEW}>
        <Button text="Добавить тему" type="button" />
      </Link>
    </div>
  )
}

export default ForumHeader
