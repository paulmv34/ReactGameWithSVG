import { FC, useState } from 'react'
import { TopicForumProps } from '../../types'
import CommentTopicForum from './CommentTopicForum/CommentTopicForum'
import Button from '@/components/Button/Button'
import TextField from '@/components/TextField/TextField'

import styles from './TopicForumContent.module.scss'
import { CommentItem } from '@/pages/Forum/components/ForumContent/ForumItem/types'

const TopicForumContent: FC<TopicForumProps> = ({ forum }: TopicForumProps) => {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(forum.comments)

  const addComment = () => {
    const comment: CommentItem = {
      id: forum.comments.length + 1,
      body: newComment,
      date: new Date().getDate().toString(),
      author: 'Автор 1',
    }
    const tmplComments = comments
    tmplComments.push(comment)
    setComments(tmplComments)
  }

  return (
    <div className={styles.container}>
      <div>
        {comments.length !== 0 ? (
          comments.map((comment) => {
            return <CommentTopicForum comment={comment} key={comment.id} />
          })
        ) : (
          <div className={styles.emptyComments}>Комментариев еще нет</div>
        )}
      </div>
      <div className={styles.inputGroup}>
        <TextField id="comment" name="comment" onChange={(e) => setNewComment(e.target.value)} value={newComment} />
        <Button text="Отправить" type="button" className={styles.button} onClick={addComment} />
      </div>
    </div>
  )
}

export default TopicForumContent
