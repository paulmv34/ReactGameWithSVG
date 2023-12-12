import clsx from 'clsx'
import styles from './Button.module.scss'

import { ButtonProps } from '@/components/Button/types'

const Button = ({ className = '', disabled, text, type }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, className)} type={type} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button
