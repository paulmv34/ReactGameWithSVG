import Button from '@/components/Button/Button'
import TextField from '@/components/TextField/TextField'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewTopic.module.scss'
import Title from '@/components/Title/Title'
import Input from '@/components/Input/Input'
import { useParams } from 'react-router'
import forumService from '@/services/forum.servise'
import { toast } from 'react-toastify'
import { ROUTES } from '@/types/types'

const NewTopic: FC = () => {
  const [nameTopic, setNameTopic] = useState('')
  const [questTopic, setQuestTopic] = useState('')

  const { idSection } = useParams()
  const navigate = useNavigate()

  const createTopic = async () => {
    if (nameTopic && questTopic && idSection) {
      const data = {
        name: nameTopic,
        content: questTopic,
        section_id: +idSection,
      }

      await forumService.createTopic(data)

      navigate(`${ROUTES.FORUM_SECTION}/${idSection}`)
    } else {
      toast.error('Заполните данные')
    }
  }

  return (
    <div className={styles.containerNewTopic}>
      <div className={styles.header}>
        <Title title="Добавить тему" />
      </div>
      <div className={styles.formGroup}>
        <Input
          id="topicName"
          name="topicName"
          onChange={(e) => setNameTopic(e.target.value)}
          value={nameTopic}
          required
          label="Название темы"
          placeholder="Название темы"
          type="text"
          className={styles.input}
        />
        <TextField
          id="questTopic"
          name="questTopic"
          onChange={(e) => setQuestTopic(e.target.value)}
          value={questTopic}
          label="Вопрос"
          placeholder="Вопрос"
          className={styles.textField}
        />
        <Button text="Создать" type="button" className={styles.button} onClick={createTopic} />
      </div>
    </div>
  )
}

export default NewTopic
