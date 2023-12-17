import { toast } from 'react-toastify'
import axios from 'axios'

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data
    const reason = responseData ? responseData.reason : 'Что-то пошло не так'
    toast.error(reason || error.message)
  } else if (error instanceof Error) {
    toast.error(error.message)
  }
}
