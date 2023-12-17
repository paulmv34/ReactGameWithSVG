import { FC } from 'react'
import ProfileInfo from './components/ProfileInfo/ProfileInfo'

import styles from './Profile.module.scss'
import clsx from 'clsx'
import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'

const Profile: FC = () => {
  return (
    <section className={clsx(styles.page, 'page')}>
      <div className="wrapper wrapper-backlink">
        <BackLink to={ROUTES.MAIN} left="13%" />
        <ProfileInfo />
      </div>
    </section>
  )
}

export default Profile
