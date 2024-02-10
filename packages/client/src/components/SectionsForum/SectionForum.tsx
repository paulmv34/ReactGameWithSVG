import React, { useEffect, useState } from 'react'
import ForumHeader from '@/pages/Forum/components/ForumHeader/ForumHeader'
import ForumContent from '@/pages/Forum/components/ForumContent/ForumContent'
import BackLink from '@/components/BackLink/BackLink'
import { ForumSection, ROUTES } from '@/types/types'
import styles from '@/pages/Forum/Forum.module.scss'
import { useParams } from 'react-router'
import forumService from '@/services/forum.servise'
import Loader from '@/components/Loader/Loader'

const SectionForum = () => {
  const [section, setSection] = useState<ForumSection | null>(null)
  const { idSection } = useParams()

  const getSection = async (id: string) => {
    const sectionsData = await forumService.getSectionData(id)

    setSection(sectionsData)
  }

  useEffect(() => {
    if (idSection) {
      getSection(idSection)
      setTimeout(() => {
        forumService.createTopic()
      }, 3000)
    }
  }, [idSection])

  return (
    <div className={styles['container-forum']}>
      {section ? (
        <>
          <ForumHeader title={section.name} />
          <ForumContent />
        </>
      ) : (
        <Loader />
      )}

      <BackLink to={ROUTES.FORUM} />
    </div>
  )
}

export default SectionForum
