import styles from './Row.module.scss'
import { RowProps } from './types'
import clsx from 'clsx'

const Row = ({ record }: RowProps) => {
  const { date, levels, nickname, score } = record ?? {}

  return (
    <div className={styles.row}>
      <span className={clsx(styles.td, styles.nickname)}>{nickname}</span>
      <span className={styles.td}>{score}</span>
      <span className={styles.td}>{levels ?? 'N/A'}</span>
      <span className={styles.td}>{date}</span>
    </div>
  )
}

export default Row
