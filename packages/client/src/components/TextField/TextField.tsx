import clsx from 'clsx'
import styles from './TextField.module.scss'
import { TextFieldProps } from './types'

const TextField = ({ className = '', id, name, onChange, placeholder, type, value }: TextFieldProps) => {
  return (
    <div className={styles['input-container']}>
      <input
        className={clsx(styles.input, className)}
        type={type}
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
