import Button from '@/components/Button/Button'
import TextField from '@/components/TextField/TextField'
import { FC, useState } from 'react'

import styles from './NewTopic.module.scss'

const NewTopic: FC = () => {
  const [nameTopic, setNameTopic] = useState('')
  const addTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameTopic(e.target.value)
  }

  return (
    <div className={styles.containerNewTopic}>
      <TextField id="topic" name="topic" onChange={(e) => addTopic(e)} type="text" value={nameTopic} />
      <Button text="Создать" type="button" className={styles.button} />
    </div>
  )
}

export default NewTopic
