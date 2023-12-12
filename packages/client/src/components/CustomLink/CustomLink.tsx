import { Link } from 'react-router-dom'
import styles from './CustomLink.module.scss'
import clsx from 'clsx'

import { CustomLinkProps } from '@/components/CustomLink/types'

const CustomLink = ({ children, className = '', to }: CustomLinkProps) => {
  return (
    <Link className={clsx(styles.link, className)} to={to}>
      {children}
    </Link>
  )
}

export default CustomLink
