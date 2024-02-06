import { FC } from 'react'

import mockData from '../../MockData.json'
import ForumItem from './ForumItem/ForumItem'
import { IForumItem } from './ForumItem/types'

const ForumContent: FC = () => {
  return (
    <div>
      {(mockData.forums as IForumItem[]).map((forum: IForumItem) => {
        return <ForumItem forum={forum} key={forum.id} />
      })}
    </div>
  )
}

export default ForumContent
