import { FC } from 'react'

import mockData from '../../MockData.json'
import ForumItem from './ForumItem/ForumItem'

const ForumContent: FC = () => {
  return (
    <div>
      {mockData.forums.map((forum) => {
        return <ForumItem forum={forum} />
      })}
    </div>
  )
}

export default ForumContent
