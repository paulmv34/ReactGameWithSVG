import React, { useEffect, useState } from 'react'
import ForumHeader from '@/pages/Forum/components/ForumHeader/ForumHeader'
import ForumContent from '@/pages/Forum/components/ForumContent/ForumContent'
import BackLink from '@/components/BackLink/BackLink'
import { ForumSection, ROUTES, PartialTopic } from '@/types/types'
import styles from '@/pages/Forum/Forum.module.scss'
import { useParams } from 'react-router'
import forumService from '@/services/forum.servise'
import Loader from '@/components/Loader/Loader'
import Title from '@/components/Title/Title'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SectionForum = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [section, setSection] = useState<ForumSection | null>(null)
  const [topics, setTopics] = useState<PartialTopic[]>([])
  const { idSection } = useParams()
  const getSection = async (id: string) => forumService.getSectionData(id)

  const getTopics = async (id: string) => forumService.getTopicsFromSection(id)

  useEffect(() => {
    if (idSection) {
      Promise.all([getSection(idSection), getTopics(idSection)])
        .then(([sectionData, topicsData]) => {
          setSection(sectionData)
          setTopics(topicsData)
        })
        .catch((err) => toast.error(err))
        .finally(() => setIsLoading(false))
    }
  }, [idSection])

  return (
    <div className={styles['container-forum']}>
      <Title title="Форум" className={styles['title']} />
      {isLoading && <Loader />}
      {section && <ForumHeader title={section.name} idSection={section.id} />}
      {topics && <ForumContent topics={topics} />}
      <BackLink to={ROUTES.FORUM} />
    </div>
  )
}

export default SectionForum
