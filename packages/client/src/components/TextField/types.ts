import { ChangeEvent } from 'react'

export interface TextFieldProps {
  className?: string
  id: string
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type: 'email' | 'tel' | 'text' | 'password'
  value: string
}
