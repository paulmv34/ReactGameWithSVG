export const YANDEX_API_URL = 'https://ya-praktikum.tech/api/v2'
export const API_URL = '/api'
export const LOCAL_URL = ''
export const TEAM_NAME = 'NoHandlebars'
export const RATING_FIELD_NAME = 'score'

export enum END_POINTS_URL {
  ADD_REACTION = '/commentAddReaction',
  CHANGE_USER_PASSWORD = '/user/password',
  CHANGE_USER_PROFILE = '/user/profile',
  CHANGE_USER_PROFILE_AVATAR = '/user/profile/avatar',
  FORUM_SECTIONS = '/forum/section',
  FORUM_TOPIC = '/forum/topic',
  TOPIC_MESSAGE = '/forum/message',
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
