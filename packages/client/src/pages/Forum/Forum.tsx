import { FC, useEffect } from 'react'
import ForumContent from './components/ForumContent/ForumContent'
import ForumHeader from './components/ForumHeader/ForumHeader'

import styles from './Forum.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'
import { useAppSelector } from '@/hooks/useAppSelector'

const Forum: FC = () => {
  const { isLoading, sections } = useAppSelector((state) => state.forum)
  return (
    <div className={styles.containerForum}>
      <ForumHeader />
      <ForumContent />
      <BackLink to={ROUTES.MAIN} />
    </div>
  )
}

export default Forum
