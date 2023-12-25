import BackLink from '@/components/BackLink/BackLink'
import { FC } from 'react'
import styles from './GameStart.module.scss'
import keyboardImage from '/public/keyboard.png'
import { ROUTES } from '@/types/types'

// Components
import CustomLink from '@/components/CustomLink/CustomLink'

const GameStart: FC = () => {
  return (
    <section className={styles['game-start']}>
      <BackLink to={ROUTES.MAIN} />
      <div className={styles['window']}>
        <div className={styles['wrapper-text']}>
          <h2 className={styles['title']}>Цель игры:</h2>
          <p className={styles['text']}>
            1.Уничтожить всех вражеских танков на уровне и защитить свою базу от их атак.
          </p>
          <p className={styles['text']}>
            2.Проходите через несколько уровней, где уровень сложности и количество врагов увеличиваются.
          </p>
        </div>

        <div className={styles['wrapper-text']}>
          <h2 className={styles['title']}>Управление:</h2>
          <p className={styles['text']}>
            1.Движение танка: Используйте стрелки на клавиатуре для перемещения танка вверх, вниз, влево и вправо по
            игровому полю.
          </p>
          <p className={styles['text']}>2.Выстрел: Используйте клавишу пробела для стрельбы из танка.</p>

          <img className={styles['keyboard-image']} src={keyboardImage} alt="" width="562px" height="212px" />

          <CustomLink className={styles.link} to={ROUTES.GAME}>
            В бой
          </CustomLink>
        </div>
      </div>
    </section>
  )
}

export default GameStart
