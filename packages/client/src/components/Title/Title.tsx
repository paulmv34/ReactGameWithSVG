import { FC } from 'react'

import styles from './Title.module.scss'

interface HeaderProps {
  title: string
  className?: string
}

const Title: FC<HeaderProps> = (props: HeaderProps) => {
  const { title, className } = props

  return (
    <div>
      <div className={`${styles.headerTitle} ${className}`}>{title}</div>
    </div>
  )
}

export default Title
