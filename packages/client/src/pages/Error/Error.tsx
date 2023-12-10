import { FC } from 'react'
import clsx from 'clsx'
import styles from './Error.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/Routes'

interface ErrorPageProps {
  codeError: number | string
}

const typesErrors: Record<string, string> = {
  '404': 'Страница не найдена',
}

const Error: FC<ErrorPageProps> = (props: ErrorPageProps) => {
  const { codeError } = props

  return (
    <main>
      <section className={clsx('page', styles['page-error'])}>
        <Header />
        <div className={clsx('wrapper', styles['wrapper-error'])}>
          <h1 className={styles['code-error']}>{codeError}</h1>
          <p className={styles['description-error']}>{typesErrors[codeError] || 'Неизвестная ошибка'}</p>
          <Link className={styles['link-error']} to={ROUTES.MAIN}>
            На главную
          </Link>
        </div>
        <Footer />
      </section>
    </main>
  )
}

export default Error
