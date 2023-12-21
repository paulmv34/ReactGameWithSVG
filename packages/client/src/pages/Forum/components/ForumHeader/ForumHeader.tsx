import Button from '@/components/Button/Button'
import { FC } from 'react'

import styles from './ForumHeader.module.scss'
import { Link } from 'react-router-dom'
import Title from '@/components/Title/Title'
import { ROUTES } from '@/types/types'

const ForumHeader: FC = () => {
  return (
    <div className={styles.containerForumHeader}>
      <Title title="Форум" />
      <Link to={ROUTES.TOPIC_NEW}>
        <Button text="Добавить тему" type="button" />
      </Link>
    </div>
  )
}

export default ForumHeader
