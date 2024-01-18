import { FC } from 'react'

import styles from './Title.module.scss'

interface HeaderProps {
  title: string
}

const Title: FC<HeaderProps> = (props: HeaderProps) => {
  const { title } = props

  return <div className={`${styles.headerTitle}`}>{title}</div>
}

export default Title
