import clsx from 'clsx'
import styles from './TextField.module.scss'
import { TextFieldProps } from './types'

const TextField = ({ className = '', id, label, name, onChange, placeholder, value }: TextFieldProps) => {
  return (
    <div className={styles['input-container']}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        className={clsx(styles.input, className)}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextField
