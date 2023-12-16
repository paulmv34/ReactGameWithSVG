import { ScreenType } from '@/mechanics/ui/screens/data'
import { MainMenuItem } from '@/mechanics/ui/screens/UIScreens/data'
import { type GameMode } from '../Game/types'
import { levels } from '../MapManager/levels'

export class State {
  inited = false
  level = 0
  maxLevels = levels.length
  mode: GameMode = MainMenuItem.Singleplayer
  defaultPlayerLives = 2
  playerOne = {
    lives: this.defaultPlayerLives,
  }
  playerTwo = {
    lives: this.defaultPlayerLives,
  }
  singleplayerMaxTotalEnemies = 20
  singleplayerMaxActiveEnemies = 4
  singleplayerEnemiesSpawnDelay = 2000
  multiplayerMaxTotalEnemies = 20
  multiplayerMaxActiveEnemies = 6
  multiplayerEnemiesSpawnDelay = 1000
  tankRespawnRetryInterval = 200
  screen = ScreenType.Loading
  mainMenuItem: MainMenuItem = MainMenuItem.Singleplayer

  width = 62
  height = 56
  boundarySize = 2
  indicatorsSidebarSize = 6
  loadResourcesTimeout = 60000
  gameIntroPopupTimeout = 2000
  missionAccomplishedRedirectTimeout = 1000
  gameOverPopupTimeout = 3000

  load() {
    this.inited = true

    this.playerOne = {
      lives: this.defaultPlayerLives,
    }

    this.playerTwo = {
      lives: this.defaultPlayerLives,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unload() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset() {}

  resetSession() {
    this.unload()
    this.load()
  }
}
