export enum ROUTES {
  ABOUT = '/about',
  ERROR_500 = '/500',
  FORUM = '/forum',
  FORUM_SECTION = '/forum/:idSection',
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

export interface ScoreData {
  date: string
  levels: number
  nickname: string
  score: number
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
