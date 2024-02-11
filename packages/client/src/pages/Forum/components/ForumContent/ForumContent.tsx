import { FC } from 'react'

import mockData from '../../MockData.json'
import ForumItem from './ForumItem/ForumItem'
import { IForumItem } from './ForumItem/types'
import { ForumContentProps } from '@/components/SectionsForum/types'

const ForumContent: FC<ForumContentProps> = ({ topics }) => {
  return (
    <div>
      {topics.map((topic) => {
        return <ForumItem topic={topic} />
      })}
    </div>
  )
}

export default ForumContent
