import { FC } from 'react'
import Title from '../../components/Title/Title'
import ChangeAvatarForm from './components/ChangeAvatarForm/ChangeAvatarForm'

import styles from './ChangeAvatar.module.scss'

const ChangeAvatar: FC = () => {
  return (
    <div className={styles.containerAvatarPage}>
      <Title title="ТАНЧИКИ" />
      <ChangeAvatarForm />
    </div>
  )
}

export default ChangeAvatar
