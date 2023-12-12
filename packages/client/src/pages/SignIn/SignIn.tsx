import { FC } from 'react'
import styles from './SignIn.module.scss'
import { ROUTES } from '@/types/types'

import SignInForm from '@/modules/SignInForm/SignInForm'
import BackLink from '@/components/BackLink/BackLink'
import clsx from 'clsx'

const SignIn: FC = () => {
  return (
    <section className={clsx(styles.page, 'page')}>
      <div className="wrapper wrapper-backlink">
        <BackLink to={ROUTES.MAIN} left="13%" />
        <h2 className={styles.title}>Вход</h2>
        <SignInForm />
      </div>
    </section>
  )
}

export default SignIn
