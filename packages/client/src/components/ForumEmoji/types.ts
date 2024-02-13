import { TopicMessage } from '@/types/types'

export interface ForumEmojiProps {
  comment: TopicMessage
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
