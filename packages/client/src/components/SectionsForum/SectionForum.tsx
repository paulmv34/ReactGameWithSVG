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

const SectionForum = () => {
  const [section, setSection] = useState<ForumSection | null>(null)
  const [topics, setTopics] = useState<PartialTopic[]>([])
  const { idSection } = useParams()

  const getSection = async (id: string) => {
    const sectionData = await forumService.getSectionData(id)
    setSection(sectionData)
  }

  const getTopics = async (id: string) => {
    const topicsData = await forumService.getTopicsFromSection(id)
    setTopics(topicsData)
  }

  useEffect(() => {
    if (idSection) {
      getSection(idSection)
      getTopics(idSection)
    }
  }, [idSection])

  return (
    <div className={styles['container-forum']}>
      <Title title="Форум" className={styles['title']} />
      {section ? (
        <>
          <ForumHeader title={section.name} idSection={section.id} />
          {topics && <ForumContent topics={topics} />}
        </>
      ) : (
        <Loader />
      )}

      <BackLink to={ROUTES.FORUM} />
    </div>
  )
}

export default SectionForum
