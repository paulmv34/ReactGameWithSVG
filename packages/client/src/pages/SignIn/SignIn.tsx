import { FC, useEffect } from 'react'
import styles from './SignIn.module.scss'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router'

import { ROUTES } from '@/types/types'

import SignInForm from '@/modules/SignInForm/SignInForm'
import { useAuth } from '@/hooks/useAuth'

const SignIn: FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { isLoggedIn } = useAuth()

  const onAuth = () => {
    navigate(state?.path || ROUTES.MAIN)
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate(state?.path || ROUTES.MAIN)
    }
  }, [])

  return (
    <section className={clsx(styles.page, 'page')}>
      <div className="wrapper wrapper-backlink">
        <h2 className={clsx(styles.title, 'page-title')}>Вход</h2>
        <SignInForm onAuth={onAuth} />
      </div>
    </section>
  )
}

export default SignIn
