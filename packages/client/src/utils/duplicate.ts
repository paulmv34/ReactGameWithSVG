import { TReaction } from '@/pages/Forum/components/ForumContent/ForumItem/types'

interface IObj {
  [key: string]: number
}
export const duplicate = (data: TReaction[]) => {
  if (!data) {
    return []
  }
  console.log(data)
  const counter: IObj = data?.reduce((obj, i) => {
    const res: IObj = { ...obj }
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
