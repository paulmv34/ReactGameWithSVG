import Button from '@/components/Button/Button'
import { FC } from 'react'

import styles from './ForumHeader.module.scss'
import { Link } from 'react-router-dom'
import Title from '@/components/Title/Title'

const ForumHeader: FC = () => {
  return (
    <div className={styles.containerForumHeader}>
      <Title title="Форум" />
      <Link to={'/forum/new'}>
        <Button text="Добавить тему" type="button" />
      </Link>
    </div>
  )
}

export default ForumHeader
