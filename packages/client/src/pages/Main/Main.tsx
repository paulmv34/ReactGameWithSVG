import { FC } from 'react'
import styles from './Main.module.scss'
import { ROUTES } from '../../routes/Routes'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { MenuItemData } from '../../types/types'
import MainMenu from '../../modules/MainMenu/MainMenu'
import clsx from 'clsx'

const mainMenu: MenuItemData[] = [
  {
    link: ROUTES.GAME,
    title: 'Игра',
  },
  {
    link: ROUTES.ABOUT,
    title: 'Об игре',
  },
  {
    link: ROUTES.PROFILE,
    title: 'Профиль',
  },
  {
    link: ROUTES.FORUM,
    title: 'Форум',
  },
  {
    link: ROUTES.LEADERBOARD,
    title: 'Топ игроков',
  },
  {
    link: ROUTES.LOGIN,
    title: 'Выход',
  },
]

const Main: FC = () => {
  return (
    <section className={clsx('page', styles['page-main'])}>
      <Header />
      <div className={clsx('wrapper', styles['wrapper-main'])}>
        <MainMenu data={mainMenu} />
        <div className={styles['main-image']}>
          <img src="/main-tank.png" alt="" />
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Main
