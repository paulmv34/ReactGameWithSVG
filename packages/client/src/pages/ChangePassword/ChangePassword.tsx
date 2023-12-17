import { FC } from 'react'

import styles from './ChangePassword.module.scss'
import ChangePasswordForm from './components/ChangePasswordForm/ChangePasswordForm'
import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'
import clsx from 'clsx'

const ChangePassword: FC = () => {
  return (
    <section className={clsx(styles.page, 'page')}>
      <div className="wrapper wrapper-backlink">
        <BackLink to={ROUTES.PROFILE} left="13%" />
        <ChangePasswordForm />
      </div>
    </section>
  )
}

export default ChangePassword
