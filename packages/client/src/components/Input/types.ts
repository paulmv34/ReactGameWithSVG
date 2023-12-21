import { ChangeEvent } from 'react'

export interface InputProps {
  autoComplete?: string
  className?: string
  error?: boolean
  errorText?: string
  id: string
  label: string
  name: string
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  type: 'email' | 'tel' | 'text' | 'password'
  value: string
}
