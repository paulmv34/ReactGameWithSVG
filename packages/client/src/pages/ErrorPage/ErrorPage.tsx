import { FC } from 'react'

interface ErrorPageProps {
  codeError: number | string
}

const ErrorPage: FC<ErrorPageProps> = (props: ErrorPageProps) => {
  const { codeError } = props

  return <div>{codeError}</div>
}

export default ErrorPage
