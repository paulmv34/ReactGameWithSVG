import { useState } from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import smile from '../../../public/smiley-plus.svg'
import { EmojiData, EmojiItem, ForumEmojiProps } from './types'

import styles from './ForumEmoji.module.scss'
import { emojiCounter } from '@/utils/emojiCounter'
import { useAppSelector } from '@/hooks/useAppSelector'
import { forumApi } from '@/api/forumApi'
import { TReaction } from '@/pages/Forum/components/ForumContent/ForumItem/types'

const ForumEmoji = ({ comment }: ForumEmojiProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [reactions, setReactions] = useState<TReaction[]>([])
  const { user } = useAppSelector((state) => state.user)

  const selectEmoji = async (data: EmojiData) => {
    setShowEmojiPicker(!showEmojiPicker)
    if (user) {
      const dataReaction: TReaction = {
        comment_id: comment.id,
        emoji: data.unified,
        user_id: user?.id,
      }
      if (reactions) {
        setReactions([...reactions, dataReaction])
      } else {
        setReactions([dataReaction])
      }

      await forumApi.addReaction(dataReaction)
    }
  }

  const arr = emojiCounter(reactions)

  return (
    <div className={styles.reactions}>
      <div className={styles.reactionsContainer}>
        {comment &&
          arr.map((item: EmojiItem, index: number) => {
            return (
              <div className={styles.emojiWrapper} key={index}>
                <span className={styles.emojiSpan}>{String.fromCodePoint(parseInt(item.emoji, 16))}</span>
                {item.count > 1 ? <span className={styles.emojiCount}>{item.count}</span> : null}
              </div>
            )
          })}
      </div>
      <div className={styles.pickerContainer}>
        <img
          src={smile}
          alt="smile icon"
          className={styles.pickerImage}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
        <div className={styles.emojiPicker}>
          {showEmojiPicker && <Picker data={data} onEmojiSelect={selectEmoji} />}
        </div>
      </div>
    </div>
  )
}

export default ForumEmoji
