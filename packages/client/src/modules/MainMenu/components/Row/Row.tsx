import styles from './Row.module.scss'
import { Link } from 'react-router-dom'
import { MenuItemProps } from './types'

const Row = ({ record }: MenuItemProps) => {
  const { link, title } = record ?? {}
  return (
    <li className={styles['main-menu-item']}>
      <Link to={link}>{title}</Link>
    </li>
  )
}

export default Row
