export enum ROUTES {
  ABOUT = '/about',
  ERROR_500 = '/500',
  FORUM = '/forum',
  GAME = '/game',
  LEADERBOARD = '/leaderboard',
  LOGIN = '/sign-in',
  MAIN = '/main',
  PROFILE = '/profile',
  REGISTRATION = '/sign-up',
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
