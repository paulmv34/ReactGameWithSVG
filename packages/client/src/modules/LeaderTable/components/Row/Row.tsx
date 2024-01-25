import styles from './Row.module.scss'
import { RowProps } from './types'
import clsx from 'clsx'

const Row = ({ record }: RowProps) => {
  const { name, nickname, score } = record ?? {}
  return (
    <div className={styles.row}>
      <span className={clsx(styles.td, styles.nickname)}>{nickname}</span>
      <span className={styles.td}>{score}</span>
      <span className={styles.td}>{name}</span>
    </div>
  )
}

export default Row
