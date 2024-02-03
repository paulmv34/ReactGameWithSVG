import BackLink from '@/components/BackLink/BackLink'
import styles from './Game.module.scss'
import clsx from 'clsx'
import { ROUTES } from '@/types/types'
import { ControllerElemsClassName } from '@/mechanics/services/Controller/data'

import { createContext, useEffect, useRef, useState } from 'react'

import { Tanchiki } from '@/mechanics'
import { type GameCreateContext } from './types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addUser } from '@/features/leaderboard/leaderboardSlice'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '@/hooks/useAppSelector'

export const GameContext = createContext<GameCreateContext>({} as GameCreateContext)

export const Game = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const onUpdateLeaderboard = (level: number, score: number) => {
    dispatch(
      addUser({
        data: {
          levels: level,
          nickname: user.user?.display_name || 'Fancy Unicorn',
          score: score,
          id: uuidv4(),
        },
      })
    )
  }
  const gameRoot = useRef(null)
  const [game, setGame] = useState<Tanchiki | null>(null)
  const [isGameInited, setIsGameInited] = useState(false)

  useEffect(() => {
    const createdGame = Tanchiki.create(onUpdateLeaderboard)
    setGame(createdGame)
    setIsGameInited(createdGame.state.inited)

    gameRoot.current && createdGame.init(gameRoot.current)

    document.querySelector('.layout')?.classList.add('layout__game')
    setViewportAttributes({ isScalable: false })

    return () => {
      createdGame.unload()
      document.querySelector('.layout')?.classList.remove('layout__game')
      setViewportAttributes({ isScalable: true })
    }
  }, [gameRoot])

  return (
    <section className={clsx(styles.gamePage, 'page')}>
      <BackLink to={ROUTES.MAIN} />
      <GameContext.Provider value={{ game, isGameInited }}>
        <div className={ControllerElemsClassName.FullscreenWrapper}>
          <div className={styles.gameWrapper}>
            <div ref={gameRoot} className={styles.gameRoot}></div>
          </div>
        </div>
      </GameContext.Provider>
    </section>
  )
}

function setViewportAttributes({ isScalable }: Record<string, boolean>) {
  const scalableContent = isScalable ? '' : ', maximum-scale=1, user-scalable=no'
  const viewport = document.querySelector('meta[name="viewport"]')

  if (viewport) {
    viewport.setAttribute('content', `width=device-width, initial-scale=1.0${scalableContent}`)
  }
}

export default Game
