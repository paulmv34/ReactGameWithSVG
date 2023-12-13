import { ChangeEvent } from 'react'

export interface InputProps {
  className?: string
  id: string
  label: string
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required: boolean
  type: 'email' | 'tel' | 'text' | 'password'
  value: string
}
