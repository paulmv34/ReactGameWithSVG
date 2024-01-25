import styles from './Row.module.scss'
import { RowProps } from './types'
import clsx from 'clsx'

const Row = ({ record }: RowProps) => {
  const { date, levels, nickname, score } = record ?? {}
  const adaptedDate = date ? new Date(date).toLocaleDateString() : 'N/A'

  return (
    <div className={styles.row}>
      <span className={clsx(styles.td, styles.nickname)}>{nickname}</span>
      <span className={styles.td}>{score}</span>
      <span className={styles.td}>{levels ?? 'N/A'}</span>
      <span className={styles.td}>{adaptedDate}</span>
    </div>
  )
}

export default Row
