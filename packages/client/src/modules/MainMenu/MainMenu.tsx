import styles from './MainMenu.module.scss'
import Row from './components/Row/Row'
import { v4 as uuidv4 } from 'uuid'
import { MenuProps } from './types'

const LeaderTable = ({ data }: MenuProps) => {
  return (
    <nav className={styles['main-menu']}>
      <ul className={styles['main-menu-list']}>
        {data?.length > 0 && data.map((record) => <Row record={record} key={uuidv4()} />)}
      </ul>
    </nav>
  )
}

export default LeaderTable
