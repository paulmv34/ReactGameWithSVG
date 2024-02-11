import React, { FC, useEffect, useState } from 'react'
import styles from './Forum.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { ForumSection, ROUTES } from '@/types/types'
import Loader from '@/components/Loader/Loader'
import Title from '@/components/Title/Title'
import { Link } from 'react-router-dom'
import forumService from '@/services/forum.servise'

const Forum: FC = () => {
  const [sections, setSections] = useState<ForumSection[]>([])

  const getSections = async () => {
    const sectionsData = await forumService.getSectionsData()

    setSections(sectionsData)
  }

  useEffect(() => {
    getSections()
  }, [])

  return (
    <div className={styles['container-forum']}>
      <Title title="Форум" className={styles['title']} />
      {sections.length ? (
        <>
          <ul className={styles['list']}>
            {sections.map((section) => (
              <li className={styles['item']}>
                <Link to={`${section.id}`} className={styles['link']}>
                  <button className={styles['button']}>
                    <span>{section.name}</span>
                    <span className={styles['topic-text']}>{section.topicCount} топиков</span>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
          <BackLink to={ROUTES.MAIN} />
        </>
      ) : (
        <Loader />
      )}

      {/*{selectedSection && (*/}
      {/*  <>*/}
      {/*    <ForumHeader />*/}
      {/*    <ForumContent />*/}
      {/*    <BackLink to={ROUTES.MAIN} />*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  )
}

export default Forum
