import { FC } from 'react'

import ForumItem from './ForumItem/ForumItem'
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
