import Button from '@/components/Button/Button'
import { FC } from 'react'

import styles from './ForumHeader.module.scss'
import { Link } from 'react-router-dom'
import Title from '@/components/Title/Title'
import { ForumHeaderProps } from '@/pages/Forum/components/ForumHeader/types'
import { ROUTES } from '@/types/types'

const ForumHeader: FC<ForumHeaderProps> = ({ idSection, title }) => {
  return (
    <div className={styles.containerForumHeader}>
      <Title title={title} />
      <Link to={`${ROUTES.FORUM_NEW}/${idSection}`}>
        <Button text="Добавить тему" type="button" />
      </Link>
    </div>
  )
}

export default ForumHeader
