import { FC, useEffect, useState } from 'react'

import data from '../Forum/MockData.json'
import TopicForumHeader from './components/TopicForumHeader/TopicForumHeader'
import TopicForumContent from './components/TopicForumContent/TopicForumContent'
import forumService from '@/services/forum.servise'

import styles from './TopicForum.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { CreateTopicMessage, ROUTES, Topic, TopicMessage } from '@/types/types'
import NewTopic from './components/NewTopic/NewTopic'
import { useLocation, useParams } from 'react-router'
import { IForumItem } from '../Forum/components/ForumContent/ForumItem/types'

const TopicForum: FC = () => {
  const [topic, setTopic] = useState<Topic | null>(null)
  const { idSection, idTopic } = useParams()

  const createMessage = async (data: CreateTopicMessage): Promise<TopicMessage> => {
    return forumService.createTopicMessageById(data)
  }

  const getTopicById = async (id: string) => {
    const topicData = await forumService.getTopicById(id)
    setTopic(topicData)
  }

  useEffect(() => {
    if (idTopic) {
      getTopicById(idTopic)
    }
  }, [idTopic])

  return (
    <div className={styles.containerTopicForum}>
      {topic ? (
        <>
          <TopicForumHeader topic={topic} />
          <TopicForumContent topic={topic} createMessage={createMessage} />
        </>
      ) : (
        <NewTopic />
      )}

      <BackLink to={`${ROUTES.FORUM}/${idSection}`} />
    </div>
  )
}

export default TopicForum
