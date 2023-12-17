export interface ForumItemProps {
  forum: ForumItem
}

export interface ForumItem {
  auhtorForum: string
  bodyForum: string
  comments: CommentItem[]
  dateForum: string
  id: number
  titleForum: string
}

export interface CommentItem {
  bodyComment: string
  dateComment: string
  id: number
  nameAuthor: string
}
