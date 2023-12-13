import { FC } from 'react'
import ProfileInfo from './components/ProfileInfo/ProfileInfo'

import styles from './Profile.module.scss'
import BackLink from '@/components/BackLink/BackLink'
import { ROUTES } from '@/types/types'

const Profile: FC = () => {
  return (
    <div className={styles.containerProfilePage}>
      <BackLink to={ROUTES.MAIN} />
      <ProfileInfo />
    </div>
  )
}

export default Profile
