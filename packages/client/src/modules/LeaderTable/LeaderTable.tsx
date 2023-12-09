import styles from './LeaderTable.module.scss'
import Row from './components/Row/Row'
import { v4 as uuidv4 } from 'uuid'
import { LeaderboardProps } from './types'

const LeaderTable = ({ data }: LeaderboardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Игрок</span>
        <span>Очки</span>
        <span>Уровни</span>
        <span>Дата</span>
      </div>
      <div className={styles.rows}>
        {data?.length > 0 && data.map((record) => <Row record={record} key={uuidv4()} />)}
      </div>
    </div>
  )
}

export default LeaderTable
