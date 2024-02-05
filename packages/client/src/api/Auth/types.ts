export interface SignUpData {
  email: string
  first_name: string
  login: string
  password: string
  phone: string
  second_name: string
}

export interface SignInData {
  login: string
  password: string
}

export interface UserInfo {
  avatar: string
  display_name: string
  email: string
  first_name: string
  id: number | null
  login: string
  phone: string
  second_name: string
}

export interface YandexServiceId {
  service_id: number
}
