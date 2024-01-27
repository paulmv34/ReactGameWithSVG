import { AxiosError } from 'axios'

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      code: error.response?.status || 500,
      message: error.message,
    }
  }
  return {
    code: 500,
    message: 'Cannot perform the operation',
  }
}
