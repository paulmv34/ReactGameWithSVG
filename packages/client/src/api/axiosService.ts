import axios from 'axios'
import { BASE_URL } from './types'

export const axiosService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000,
})
