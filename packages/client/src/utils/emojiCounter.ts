import { TReaction } from '@/pages/Forum/components/ForumContent/ForumItem/types'

export const emojiCounter = (data: TReaction[]) => {
  if (!data) {
    return []
  }
  const counter: Record<string, number> = data?.reduce((obj, i) => {
    const res: Record<string, number> = { ...obj }
    if (!Object.prototype.hasOwnProperty.call(res, i.emoji)) {
      res[i.emoji] = 0
    }
    res[i.emoji]++
    return res
  }, {})

  const currentArr = Object.keys(counter)?.map((emoji) => {
    return { emoji: emoji, count: counter[emoji] }
  })

  return currentArr
}
