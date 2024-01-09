import { FC } from 'react'
import clsx from 'clsx'
import styles from './Error.module.scss'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/types/types'
import { ErrorPageProps } from './types'

const typesErrors: Record<string, string> = {
  '500': 'Что-то пошло не так',
  '404': 'Страница не найдена',
}

const Error: FC<ErrorPageProps> = (props) => {
  const { codeError, textError } = props

  return (
    <section className={clsx('page', styles['page-error'])}>
      <div className={clsx('wrapper', styles['wrapper-error'])}>
        <h1 className={styles['code-error']}>{codeError}</h1>
        <p className={styles['description-error']}>{textError || typesErrors[codeError]}</p>
        <Link className={styles['link-error']} to={ROUTES.MAIN}>
          На главную
        </Link>
      </div>
    </section>
  )
}

export default Error
