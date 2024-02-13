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
    <section className={clsx('page', styles.pageError)}>
      <div className={clsx('wrapper', styles.wrapperError)}>
        <h1 className={styles.codeError}>{codeError}</h1>
        <p className={styles.descriptionError}>{textError || typesErrors[codeError]}</p>
        <Link className={styles.linkError} to={ROUTES.MAIN}>
          На главную
        </Link>
      </div>
    </section>
  )
}

export default Error
