import { FC, useEffect, useState } from 'react'

import TopicForumHeader from './components/TopicForumHeader/TopicForumHeader'
import TopicForumContent from './components/TopicForumContent/TopicForumContent'
import forumService from '@/services/forum.servise'
import { useNavigate } from 'react-router-dom'

import styles from './TopicForum.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { CreateTopicMessage, ROUTES, Topic, TopicMessage } from '@/types/types'
import { useParams } from 'react-router'
import Loader from '@/components/Loader/Loader'

const TopicForum: FC = () => {
  const [topic, setTopic] = useState<Topic | null>(null)
  const { idSection, idTopic } = useParams()
  const navigate = useNavigate()

  const createMessage = async (data: CreateTopicMessage): Promise<TopicMessage> => {
    return forumService.createTopicMessageById(data)
  }

  const getTopicById = async (id: string) => {
    try {
      const topicData = await forumService.getTopicById(id)
      setTopic(topicData)
    } catch (e) {
      navigate(ROUTES.ERROR_500)
    }
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
        <Loader />
      )}

      <BackLink to={`${ROUTES.FORUM}/${idSection}`} />
    </div>
  )
}

export default TopicForum
