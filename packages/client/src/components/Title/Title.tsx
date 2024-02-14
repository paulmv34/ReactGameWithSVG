import { FC } from 'react'

import styles from './Title.module.scss'
import clsx from 'clsx'

interface TitleProps {
  className?: string
  title: string
}

const Title: FC<TitleProps> = (props) => {
  const { className = '', title } = props

  return <div className={clsx(styles.headerTitle, className)}>{title}</div>
}

export default Title
