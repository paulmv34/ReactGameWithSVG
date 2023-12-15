import { FC } from 'react'

import styles from './ChangePassword.module.scss'
import ChangePasswordForm from './components/ChangePasswordForm/ChangePasswordForm'
import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'

const ChangePassword: FC = () => {
  return (
    <div className={styles.containerPasswordPage}>
      <BackLink to={ROUTES.PROFILE} />
      <ChangePasswordForm />
    </div>
  )
}

export default ChangePassword
