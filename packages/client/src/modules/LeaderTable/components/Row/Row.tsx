import styles from './Row.module.scss'
import { RowProps } from './types'

const Row = ({ record }: RowProps) => {
  const { date, levels, nickname, score } = record ?? {}
  return (
    <div className={styles.row}>
      <span>{nickname}</span>
      <span>{score}</span>
      <span>{levels}</span>
      <span>{date}</span>
    </div>
  )
}

export default Row
