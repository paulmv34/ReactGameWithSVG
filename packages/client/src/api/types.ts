export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

export enum END_POINTS_URL {
  CHANGE_USER_PASSWORD = '/user/password',
  CHANGE_USER_PROFILE = '/user/profile',
  CHANGE_USER_PROFILE_AVATAR = '/user/profile/avatar',
}

export type TUserData = {
  avatar?: string | null
  display_name: string
  email: string
  first_name: string
  id?: number
  login: string
  phone: string
  second_name: string
}

export type TUserPassword = {
  newPassword: string
  oldPassword: string
  repeatNewPassword: string
}
