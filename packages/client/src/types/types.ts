export enum ROUTES {
  ABOUT = '/about',
  ERROR_500 = '/500',
  FORUM = '/forum',
  GAME = '/game',
  LEADERBOARD = '/leaderboard',
  LOGIN = '/login',
  MAIN = '/main',
  PROFILE = '/profile',
  REGISTRATION = '/registration',
  TOPIC_FORUM = '/forum/*',
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
