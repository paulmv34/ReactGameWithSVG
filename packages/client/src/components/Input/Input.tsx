import { InputProps } from '@/components/Input/types'
import clsx from 'clsx'
import styles from './Input.module.scss'

const Input = ({
  autoComplete = 'off',
  className = '',
  error = false,
  errorText = '',
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  required,
  type,
  value,
}: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <sup>*</sup>}
      </label>
      <input
        className={clsx(styles.input, className, { [styles.inputError]: error })}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
      <span className={styles.error}>{errorText}</span>
    </div>
  )
}

export default Input
