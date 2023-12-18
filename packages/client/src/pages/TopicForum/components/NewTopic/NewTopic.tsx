import Button from '@/components/Button/Button'
import TextField from '@/components/TextField/TextField'
import { FC, useState } from 'react'

import styles from './NewTopic.module.scss'
import Title from '@/components/Title/Title'
import Input from '@/components/Input/Input'

const NewTopic: FC = () => {
  const [nameTopic, setNameTopic] = useState('')
  const [questTopic, setQuestTopic] = useState('')

  return (
    <div className={styles.containerNewTopic}>
      <Title title="Добавить тему" />
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
        <Button text="Создать" type="button" className={styles.button} />
      </div>
    </div>
  )
}

export default NewTopic
