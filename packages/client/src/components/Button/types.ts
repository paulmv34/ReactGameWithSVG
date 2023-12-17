export interface ButtonProps {
  className?: string
  disabled?: boolean
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  text: string
  transparent?: boolean
  type: 'button' | 'submit' | 'reset'
}
