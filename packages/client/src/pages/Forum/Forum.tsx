import React, { FC, useEffect, useState } from 'react'
import styles from './Forum.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { ForumSection, ROUTES } from '@/types/types'
import Loader from '@/components/Loader/Loader'
import Title from '@/components/Title/Title'
import { Link, useNavigate } from 'react-router-dom'
import forumService from '@/services/forum.servise'

const Forum: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sections, setSections] = useState<ForumSection[]>([])
  const navigate = useNavigate()

  const getSections = async () => {
    try {
      const sectionsData = await forumService.getSectionsData()
      setSections(sectionsData)
      setIsLoading(false)
    } catch (e) {
      navigate(ROUTES.ERROR_500)
    }
  }

  useEffect(() => {
    getSections()
  }, [])

  return (
    <div className={styles.headerContainer}>
      <Title title="Форум" className={styles.title} />
      {isLoading && <Loader />}
      {sections.length && (
        <>
          <ul className={styles.list}>
            {sections.map((section) => (
              <li className={styles.item}>
                <Link to={`${section.id}`} className={styles.link}>
                  <button className={styles.button}>
                    <span>{section.name}</span>
                    <span className={styles.topicText}>{section.topicCount} топиков</span>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
          <BackLink to={ROUTES.MAIN} />
        </>
      )}
    </div>
  )
}

export default Forum
