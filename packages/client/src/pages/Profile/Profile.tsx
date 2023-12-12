import { FC } from 'react'
import Title from '../../components/Title/Title'
import ProfileInfo from './components/ProfileInfo/ProfileInfo'

import styles from './Profile.module.scss'

const Profile: FC = () => {
  return (
    <div className={styles.containerProfilePage}>
      <Title title="ТАНЧИКИ" />
      <ProfileInfo />
    </div>
  )
}

export default Profile
