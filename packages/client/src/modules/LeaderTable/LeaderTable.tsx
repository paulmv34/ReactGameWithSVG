import styles from './LeaderTable.module.scss'
import Row from './components/Row/Row'
import { LeaderboardProps } from './types'

const LeaderTable = ({ records }: LeaderboardProps) => {
  return (
    <>
      <div className={styles.header}>
        <span className={styles.th}>Игрок</span>
        <span className={styles.th}>Очки</span>
        <span className={styles.th}>Уровни</span>
        <span className={styles.th}>Дата</span>
      </div>
      <div className={styles.rows}>
        {records.length > 0 && records.map(({ data: record }) => <Row record={record} key={record.id} />)}
      </div>
    </>
  )
}

export default LeaderTable
