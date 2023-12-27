import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import clsx from 'clsx'
import styles from '@/pages/SignIn/SignIn.module.scss'

import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'
import SignUpForm from '@/modules/SignUpForm/SignUpForm'
import { useAuth } from '@/hooks/useAuth'

const SignUp: FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const { state } = useLocation()

  const onRegister = () => {
    navigate(ROUTES.MAIN)
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate(state?.path || ROUTES.MAIN)
    }
  }, [])

  return (
    <section className={clsx(styles.page, 'page')}>
      <div className="wrapper wrapper-backlink">
        <BackLink to={ROUTES.MAIN} left="13%" />
        <h2 className={clsx(styles.title, 'page-title')}>Регистрация</h2>
        <SignUpForm onRegister={onRegister} />
      </div>
    </section>
  )
}

export default SignUp
