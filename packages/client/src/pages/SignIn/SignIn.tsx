import { FC } from 'react'
import styles from './SignIn.module.scss'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router'

import { ROUTES } from '@/types/types'

import SignInForm from '@/modules/SignInForm/SignInForm'
import BackLink from '@/components/BackLink/BackLink'

const SignIn: FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const onAuth = () => navigate(state?.path || ROUTES.MAIN)

  return (
    <section className={clsx(styles.page, 'page')}>
      <div className="wrapper wrapper-backlink">
        <BackLink to={ROUTES.MAIN} left="13%" />
        <h2 className={clsx(styles.title, 'page-title')}>Вход</h2>
        <SignInForm onAuth={onAuth} />
      </div>
    </section>
  )
}

export default SignIn
