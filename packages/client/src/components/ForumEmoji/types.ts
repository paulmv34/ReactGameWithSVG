import { CommentItem } from '@/pages/Forum/components/ForumContent/ForumItem/types'

export interface ForumEmojiProps {
  comment: CommentItem
}

export interface EmojiData {
  emoticons?: string[]
  id: string
  keywords: string[]
  name: string
  native: string
  shortcodes: string
  unified: string
}

export interface EmojiItem {
  count: number
  emoji: string
}
