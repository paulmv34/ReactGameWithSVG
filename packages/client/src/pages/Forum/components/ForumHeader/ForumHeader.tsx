import Button from '@/components/Button/Button'
import { FC } from 'react'

import styles from './ForumHeader.module.scss'
import { Link } from 'react-router-dom'

const ForumHeader: FC = () => {
  return (
    <div className={styles.containerForumHeader}>
      <div>Форум</div>
      <Link to={'/forum/new'}>
        <Button text="Добавить тему" type="button" />
      </Link>
    </div>
  )
}

export default ForumHeader
