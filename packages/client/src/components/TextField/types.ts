import { ChangeEvent } from 'react'

export interface TextFieldProps {
  className?: string
  id: string
  label?: string
  name: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  value: string
}
