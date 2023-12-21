import { FC } from 'react'
import ForumContent from './components/ForumContent/ForumContent'
import ForumHeader from './components/ForumHeader/ForumHeader'

import styles from './Forum.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'

const Forum: FC = () => {
  return (
    <div className={styles.containerForum}>
      <ForumHeader />
      <ForumContent />
      <BackLink to={ROUTES.MAIN} />
    </div>
  )
}

export default Forum
