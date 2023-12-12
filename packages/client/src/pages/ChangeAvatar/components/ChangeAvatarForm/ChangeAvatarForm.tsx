import { FC } from 'react'
import { Button } from '@mui/material'

import styles from './ChangeAvatarForm.module.scss'
import Title from '../../../../components/Title/Title'

const ChangeAvatarForm: FC = () => {
  return (
    <div className={styles.container}>
      <Title title="Смена аватара" />
      <form method="post" encType="multipart/form-data">
        <div className={styles.inputAvatar}>
          <label htmlFor="file">Загрузить</label>
          <input type="file" id="file" name="file" multiple />
        </div>
        <Button variant="contained" fullWidth className={styles.button} type="submit">
          Сохранить
        </Button>
      </form>
    </div>
  )
}

export default ChangeAvatarForm
