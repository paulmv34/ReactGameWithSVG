import styles from './Row.module.scss'
import { Link } from 'react-router-dom'
import { MenuItemProps } from './types'
import Bullet from '@/assets/images/bullet.svg?react'

const Row = ({ record }: MenuItemProps) => {
  const { link, title } = record ?? {}
  return (
    <li className={styles.mainMenuItem}>
      <Link to={link}>
        {title}
        <Bullet className={styles.bullet} />
      </Link>
    </li>
  )
}

export default Row
