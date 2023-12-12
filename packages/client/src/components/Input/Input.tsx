import { InputProps } from '@/components/Input/types'
import clsx from 'clsx'
import styles from './Input.module.scss'

const Input = ({ className = '', id, label, name, onChange, placeholder, required, type, value }: InputProps) => {
  return (
    <div className={styles['input-container']}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <sup>*</sup>}
      </label>
      <input
        className={clsx(styles.input, className)}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
