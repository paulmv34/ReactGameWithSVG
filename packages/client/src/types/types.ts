export enum ROUTES {
  ABOUT = '/about',
  ERROR_500 = '/500',
  FORUM = '/forum',
  FORUM_SECTION = '/forum',
  FORUM_TOPIC_NEW = '/forum/new',
  GAME = '/game',
  GAME_START = '/game/start',
  LEADERBOARD = '/leaderboard',
  LOGIN = '/sign-in',
  MAIN = '/',
  PROFILE = '/profile',
  PROFILE_AVATAR = '/profile/changeAvatar',
  PROFILE_PASSWORD = '/profile/changePassword',
  REGISTRATION = '/sign-up',
}

export interface MenuItemData {
  link: ROUTES
  title: string
}

export enum Sizes {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export interface LeaderboardNewRecord {
  data: any
}

export interface LeaderboardNewRecordExtended extends LeaderboardNewRecord {
  ratingFieldName: string
  teamName: string
}

export interface LeaderboardData {
  cursor: number
  limit: number
  ratingFieldName: string
}

export interface LeaderboardTeamData {
  payload: LeaderboardData
  teamName: string
}

export interface LeaderboardResponseItem {
  data: {
    date: string
    id: string
    levels: number
    nickname: string
    score: number
  }
}

export interface ErrorObject {
  code: number
  message: string
}

export interface ForumSection {
  created_at: string
  id: number
  messages: number
  name: string
  topicCount: number
  updated_at: string
}

export interface CreateTopic {
  content: string
  name: string
  section_id: number
}

export interface PartialTopic {
  content: string
  created_at: string
  id: number
  name: string
  section_id: number
  updated_at: string
  user_id: number
}

export interface PartialUser {
  avatar: string | null
  created_at: string
  display_name: string
  login: string
  updated_at: string
  ya_id: number
}

export interface TopicMessage {
  content: string
  created_at: string
  id: number
  topic_id: number
  updated_at: string
  user: PartialUser
  user_id: number
}

export interface Topic extends PartialTopic {
  messages: TopicMessage[]
  section: Omit<ForumSection, 'messages' | 'topicCount'>
  user: PartialUser
}

export interface CreateTopicMessage {
  content: string
  topic_id: number

export type Themes = 'system' | 'dark' | 'light'

export type ThemesPayload = {
  theme: Themes
}
