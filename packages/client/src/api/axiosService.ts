import axios from 'axios'
import { BASE_URL, LOCAL_URL } from './types'

export const axiosService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000,
})

export const axiosServiceLocal = axios.create({
  baseURL: LOCAL_URL,
  withCredentials: true,
  timeout: 5000,
})
