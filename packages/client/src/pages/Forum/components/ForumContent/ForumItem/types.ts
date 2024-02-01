export interface ForumItemProps {
  forum: ForumItem
}

export interface ForumItem {
  author: string
  body: string
  comments: CommentItem[]
  date: string
  id: number
  title: string
}

export interface CommentItem {
  author: string
  body: string
  date: string
  id: number
  reactions: TReaction[]
}

export type TReaction = {
  comment_id: number
  emoji: string
  user_id: number | null
}
