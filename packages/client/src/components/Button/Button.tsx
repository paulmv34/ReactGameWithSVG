import clsx from 'clsx'
import styles from './Button.module.scss'

import { ButtonProps } from '@/components/Button/types'

const Button = ({ className = '', text, type }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, className)} type={type}>
      {text}
    </button>
  )
}

export default Button
