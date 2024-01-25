import styles from './LeaderTable.module.scss'
import Row from './components/Row/Row'
import { v4 as uuidv4 } from 'uuid'
import { LeaderboardProps } from './types'

const LeaderTable = ({ records }: LeaderboardProps) => {
  console.log(records)
  return (
    <>
      <div className={styles.header}>
        <span className={styles.th}>Игрок</span>
        <span className={styles.th}>Очки</span>
        <span className={styles.th}>Уровни</span>
        <span className={styles.th}>Дата</span>
      </div>
      <div className={styles.rows}>
        {records?.length > 0 && records.map(({ data: record }) => <Row record={record} key={uuidv4()} />)}
      </div>
    </>
  )
}

export default LeaderTable
