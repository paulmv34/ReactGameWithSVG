import { ScreenType } from '@/mechanics/ui/screens/data'
import { MainMenuItem } from '@/mechanics/ui/screens/UIScreens/data'
import { type GameMode } from '../Game/types'
import { levels } from '../MapManager/levels'

export class State {
  inited = false
  paused = false
  debugging = false

  level = 0
  maxLevels = levels.length
  mode: GameMode = MainMenuItem.Singleplayer
  username = ''

  defaultPlayerLives = 2
  defaultPlayerUpgradeTier = 1

  playerOne = {
    lives: this.defaultPlayerLives,
    upgradeTier: this.defaultPlayerUpgradeTier,
  }
  playerTwo = {
    lives: this.defaultPlayerLives,
    upgradeTier: this.defaultPlayerUpgradeTier,
  }

  singleplayerMaxTotalEnemies = 20
  singleplayerMaxActiveEnemies = 4
  singleplayerEnemiesSpawnDelay = 2000
  multiplayerMaxTotalEnemies = 20
  multiplayerMaxActiveEnemies = 6
  multiplayerEnemiesSpawnDelay = 1000
  tankRespawnRetryInterval = 200
  flashingEnemyTanksWithPowerups = [4, 11, 18]

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
  scoreScreenTimeout = 7000
  wallsPowerupDuration = 10000
  shieldPowerupDuration = 10000
  freezePowerupDuration = 10000

  load() {
    this.inited = true
    this.paused = false

    this.playerOne = {
      lives: this.defaultPlayerLives,
      upgradeTier: this.defaultPlayerUpgradeTier,
    }

    this.playerTwo = {
      lives: this.defaultPlayerLives,
      upgradeTier: this.defaultPlayerUpgradeTier,
    }
  }

  unload() {
    this.inited = false
    this.paused = false
  }

  reset() {
    this.paused = false
  }

  resetSession() {
    this.unload()
    this.load()
  }
}
