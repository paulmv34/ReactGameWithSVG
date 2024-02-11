import { FC, useEffect, useState } from 'react'
import { TopicForumHeaderProps } from '../../types'
import CommentTopicForum from './CommentTopicForum/CommentTopicForum'
import Button from '@/components/Button/Button'
import TextField from '@/components/TextField/TextField'

import styles from './TopicForumContent.module.scss'
import { CommentItem } from '@/pages/Forum/components/ForumContent/ForumItem/types'
import { TopicForumContentProps } from '@/pages/TopicForum/components/TopicForumContent/types'
import { toast } from 'react-toastify'

const TopicForumContent: FC<TopicForumContentProps> = ({ createMessage, topic }) => {
  const { messages } = topic
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(topic.messages)

  // const addComment = () => {
  //   const comment: CommentItem = {
  //     id: forum.comments.length + 1,
  //     body: newComment,
  //     date: new Date().getDate().toString(),
  //     author: 'Автор 1',
  //     reactions: [],
  //   }
  //   const tmplComments = comments
  //   tmplComments.push(comment)
  //   setComments(tmplComments)
  // }

  const sendComment = async () => {
    if (newComment) {
      const comment = await createMessage({ content: newComment, topic_id: topic.id })
      setComments((state) => [...state, comment])
      toast.success('Комментарий добавлен')
    } else {
      toast.error('Комментарий не может быть пустой!')
    }
  }

  useEffect(() => {
    console.log(comments)
  }, [comments])

  return (
    <div className={styles.container}>
      <div>
        {comments.length ? (
          comments.map((comment) => {
            return <CommentTopicForum comment={comment} key={comment.id} />
          })
        ) : (
          <div className={styles.emptyComments}>Комментариев еще нет</div>
        )}
      </div>
      <div className={styles.inputGroup}>
        <TextField
          id="comment"
          name="comment"
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          label="Комментарий"
          className={styles.textField}
        />
        <Button text="Добавить комментарий" type="button" className={styles.button} onClick={sendComment} />
      </div>
    </div>
  )
}

export default TopicForumContent
