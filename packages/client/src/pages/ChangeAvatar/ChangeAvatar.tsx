import { FC } from 'react'
import ChangeAvatarForm from './components/ChangeAvatarForm/ChangeAvatarForm'

import styles from './ChangeAvatar.module.scss'
import { ROUTES } from '@/types/types'
import BackLink from '@/components/BackLink/BackLink'

const ChangeAvatar: FC = () => {
  return (
    <div className={styles.containerAvatarPage}>
      <BackLink to={ROUTES.PROFILE} />
      <ChangeAvatarForm />
    </div>
  )
}

export default ChangeAvatar
