import { FC, useEffect } from 'react'
import styles from './SignIn.module.scss'
import clsx from 'clsx'
import { useNavigate } from 'react-router'

import { ROUTES } from '@/types/types'

import SignInForm from '@/modules/SignInForm/SignInForm'
import { useAuth } from '@/hooks/useAuth'

const SignIn: FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const onAuth = () => {
    console.log('hey, onAuth has just been triggered')
    // navigate(ROUTES.MAIN)
  }

  useEffect(() => {
    console.log('I have been triggered in SignIn.tsx')
    if (isLoggedIn) {
      navigate(ROUTES.MAIN)
    }
  }, [isLoggedIn])

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
