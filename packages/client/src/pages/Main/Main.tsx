import { FC } from 'react'
import styles from './Main.module.scss'
import { MenuItemData, ROUTES } from '@/types/types'
import MainMenu from '@/modules/MainMenu/MainMenu'
import clsx from 'clsx'

const mainMenu: MenuItemData[] = [
  {
    link: ROUTES.GAME_START,
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
]

const Main: FC = () => {
  return (
    <section className={clsx('page', styles.pageMain)}>
      <div className={clsx('wrapper', styles.wrapperMain)}>
        <MainMenu data={mainMenu} />
        <div className={styles.mainImage}>
          <img src="/images/main-tank.png" alt="" />
        </div>
      </div>
    </section>
  )
}

export default Main
