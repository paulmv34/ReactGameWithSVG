import { FC, useState } from 'react'
import { Button } from '@mui/material'

import styles from './ChangeAvatarForm.module.scss'
import Title from '../../../../components/Title/Title'
import { userApi } from '@/api/userApi'

const ChangeAvatarForm: FC = () => {
  const [fileAvatar, setFileAvatar] = useState<string | Blob>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget

    if (files) {
      const file = files[0]
      setFileAvatar(file)
    }
  }

  const onClickButton = () => {
    const formData = new FormData()
    formData.append('avatar', fileAvatar)
    userApi.setNewAvatarData(formData)
  }

  return (
    <div className={styles.container}>
      <Title title="Смена аватара" />
      <div>
        <div className={styles.inputAvatar}>
          <label htmlFor="avatar">Загрузить</label>
          <input type="file" id="avatar" name="avatar" multiple onChange={handleChange} />
        </div>
        <Button variant="contained" fullWidth className={styles.button} onClick={onClickButton}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default ChangeAvatarForm
