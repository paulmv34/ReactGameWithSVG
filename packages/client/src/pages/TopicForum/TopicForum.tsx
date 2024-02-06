import { FC } from 'react'

import data from '../Forum/MockData.json'
import TopicForumHeader from './components/TopicForumHeader/TopicForumHeader'
import TopicForumContent from './components/TopicForumContent/TopicForumContent'

import styles from './TopicForum.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'
import NewTopic from './components/NewTopic/NewTopic'
import { useLocation } from 'react-router'
import { IForumItem } from '../Forum/components/ForumContent/ForumItem/types'

const TopicForum: FC = () => {
  const idForum = useLocation().pathname.split('/')[2]
  const forumData = (data.forums as IForumItem[]).find((forum) => forum.id === Number(idForum))

  return (
    <div className={styles.containerTopicForum}>
      {forumData ? (
        <>
          <TopicForumHeader forum={forumData} />
          <TopicForumContent forum={forumData} />
        </>
      ) : (
        <NewTopic />
      )}

      <BackLink to={ROUTES.FORUM} />
    </div>
  )
}

export default TopicForum
