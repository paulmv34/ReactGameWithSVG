import { FC } from 'react'
import { Field } from 'formik'

import styles from './CustomInput.module.scss'

interface ICustomInputProps {
  name: string
  placeholder: string
}

const CustomInput: FC<ICustomInputProps> = (props: ICustomInputProps) => {
  const { name, placeholder } = props

  return (
    <div className={styles.customInputContainer}>
      <label htmlFor={name}>{placeholder}</label>
      <Field id={name} name={name} placeholder={placeholder} />
    </div>
  )
}

export default CustomInput
