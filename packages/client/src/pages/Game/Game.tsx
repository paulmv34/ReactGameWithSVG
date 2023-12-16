import BackLink from '@/components/BackLink/BackLink'
import styles from './Game.module.scss'
import clsx from 'clsx'
import { ROUTES } from '@/types/types'
;<BackLink to={ROUTES.MAIN} left="13%" />

import { createContext, useEffect, useRef, useState } from 'react'

import { Tanchiki } from '../../mechanics'
import { type GameCreateContext } from './types'

export const GameContext = createContext<GameCreateContext>(
  {} as GameCreateContext
)

export const Game = () => {
  const gameRoot = useRef(null)
  const game = Tanchiki.create()
  const [isGameInited, setIsGameInited] = useState(game.state.inited)

  useEffect(() => {
    game.init(gameRoot.current)
    setIsGameInited(game.state.inited)

    document.querySelector('.layout')?.classList.add('layout__game')
    setViewportAttributes({ isScalable: false })

    return () => {
      game.unload()
      document.querySelector('.layout')?.classList.remove('layout__game')
      setViewportAttributes({ isScalable: true })
    }
  }, [])

  return (
    <section className={clsx(styles.game, 'page')}>
      <BackLink to={ROUTES.MAIN} />
      <GameContext.Provider value={{ game, isGameInited }}>
        <section>
          <div ref={gameRoot} className="game__root"></div>
          <div className="desktop-controller"></div>
        </section>
      </GameContext.Provider>
    </section>
  )
}

function setViewportAttributes({ isScalable }: Record<string, boolean>) {
  const scalableContent = isScalable
    ? ''
    : ', maximum-scale=1, user-scalable=no'
  const viewport = document.querySelector('meta[name="viewport"]')

  if (viewport) {
    viewport.setAttribute(
      'content',
      `width=device-width, initial-scale=1.0${scalableContent}`
    )
  }
}

export default Game
