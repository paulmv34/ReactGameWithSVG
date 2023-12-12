import { FC } from 'react'

import styles from './ChangePassword.module.scss'
import Title from '../../components/Title/Title'
import ChangePasswordForm from './components/ChangePasswordForm/ChangePasswordForm'

const ChangePassword: FC = () => {
  return (
    <div className={styles.containerPasswordPage}>
      <Title title="ТАНЧИКИ" />
      <ChangePasswordForm />
    </div>
  )
}

export default ChangePassword
