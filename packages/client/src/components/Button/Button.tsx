import clsx from 'clsx'
import styles from './Button.module.scss'

import { ButtonProps } from '@/components/Button/types'
import { Sizes } from '@/types/types'

const Button = ({ className = '', disabled, onClick, size = Sizes.MEDIUM, text, transparent, type }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles['button-transparent']]: transparent,
        [styles[`button-${size}`]]: size,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}

export default Button
