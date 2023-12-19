export enum ROUTES {
  ABOUT = '/about',
  ERROR_500 = '/500',
  FORUM = '/forum',
  GAME = '/game',
  LEADERBOARD = '/leaderboard',
  LOGIN = '/sign-in',
  MAIN = '/',
  PROFILE = '/profile',
  PROFILE_AVATAR = '/profile/changeAvatar',
  PROFILE_PASSWORD = '/profile/changePassword',
  REGISTRATION = '/sign-up',
  TOPIC_FORUM = '/forum/*',
  TOPIC_NEW = '/forum/new',
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
