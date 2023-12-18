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
}
