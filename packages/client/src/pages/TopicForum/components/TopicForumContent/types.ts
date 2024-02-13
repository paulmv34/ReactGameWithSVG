import { CreateTopicMessage, Topic, TopicMessage } from '@/types/types'

export interface TopicForumContentProps {
  createMessage: (data: CreateTopicMessage) => Promise<TopicMessage>
  topic: Topic
}
