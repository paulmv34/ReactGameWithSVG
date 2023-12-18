import { FC } from 'react'
import ChangeAvatarForm from './components/ChangeAvatarForm/ChangeAvatarForm'

import styles from './ChangeAvatar.module.scss'
import { ROUTES } from '@/types/types'
import BackLink from '@/components/BackLink/BackLink'
import clsx from 'clsx'

const ChangeAvatar: FC = () => {
  return (
    <section className={clsx(styles.page, 'page')}>
      <div className="wrapper wrapper-backlink">
        <BackLink to={ROUTES.PROFILE} left="13%" />
        <ChangeAvatarForm />
      </div>
    </section>
  )
}

export default ChangeAvatar
