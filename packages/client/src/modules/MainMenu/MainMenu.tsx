import styles from './MainMenu.module.scss'
import Row from './components/Row/Row'
import { v4 as uuidv4 } from 'uuid'
import { MenuProps } from './types'
import Button from '@/components/Button/Button'
import { ROUTES, Sizes } from '@/types/types'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

const MainMenu = ({ data }: MenuProps) => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout().then(() => navigate(ROUTES.LOGIN))
  }

  return (
    <nav className={styles.mainMenu}>
      <ul className={styles.mainMenuList}>
        {data?.length > 0 && data.map((record) => <Row record={record} key={uuidv4()} />)}
        <li>
          <Button onClick={handleLogout} type="button" text="Выход" size={Sizes.LARGE} transparent />
        </li>
      </ul>
    </nav>
  )
}

export default MainMenu
