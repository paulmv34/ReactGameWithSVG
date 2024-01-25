import { type Entity } from '@/mechanics/models'
import { Direction } from '@/mechanics/models/Entity/types'
import { Overlay } from '@/mechanics/ui'
import { ScreenType } from '@/mechanics/ui/screens/data'
import { MainMenuItem } from '@/mechanics/ui/screens/UIScreens/data'
import { EventEmitter, sleep } from '@/mechanics/utils'
import {
  AudioManager,
  ControllerKeyboard,
  ControllerManager,
  Loop,
  Resources,
  ResourcesEvent,
  Scenario,
  ScenarioEvent,
  State,
  Statistics,
  View,
  Zone,
} from '..'
import { type Controller, ControllerEvent } from '../Controller'
import { type BindingConfig, KeyBindingsArrows, KeyBindingsWasd } from '../Controller/KeyBindings'
import { GameEvents } from './data'
import { type StatisticsData } from '../Statistics/types'
import { store } from '@/store/store'
import { addUser } from '@/features/leaderboard/leaderboardSlice'
import { TEAM_NAME } from '@/api/types'

export { type GameMode } from './types'

export class Game extends EventEmitter {
  static __instance: Game
  state: State
  resources: Resources
  loop: Loop
  zone: Zone
  view: View
  overlay: Overlay
  scenario: Scenario | undefined
  controllerAll: Controller
  controllerPlayerOne: Controller
  controllerPlayerTwo: Controller
  audioManager: AudioManager
  statistics: Statistics

  private constructor() {
    super()
    this.state = new State()
    this.resources = new Resources(this)
    this.loop = new Loop()
    this.zone = new Zone(this)
    this.view = new View(this)
    this.overlay = new Overlay(this)
    this.controllerAll = this.createController({
      ...KeyBindingsWasd,
      ...KeyBindingsArrows,
    })
    this.controllerPlayerOne = this.createController(KeyBindingsWasd)
    this.controllerPlayerTwo = new ControllerKeyboard(KeyBindingsArrows)
    this.audioManager = new AudioManager(this)
    this.statistics = new Statistics(this)
  }

  static create() {
    if (!Game.__instance) {
      Game.__instance = new Game()
    }
    return Game.__instance
  }

  init(root: HTMLElement | null) {
    this.unload()
    this.load(root)
    this.initLoading()
  }

  load(root: HTMLElement | null) {
    this.state.load()
    this.resources.load()
    this.view.load(root)
    this.overlay.load()
    this.loop.load()
    this.audioManager.load()
    this.controllerAll.load()
    this.controllerPlayerOne.load()
    this.controllerPlayerTwo.load()
    this.statistics.load()
  }

  unload() {
    this.clearAllListeners()
    this.state.unload()
    this.loop.unload()
    this.view.unload()
    this.overlay.unload()
    this.audioManager.unload()
    this.controllerAll.unload()
    this.controllerPlayerOne.unload()
    this.controllerPlayerTwo.unload()
    this.statistics.unload()
  }

  reset() {
    if (this.scenario) {
      delete this.scenario
    }
    this.state.reset()
    this.loop.reset()
    this.zone.reset()
    this.view.reset()
    this.overlay.reset()
    this.audioManager.reset()
    this.controllerAll.reset()
    this.controllerPlayerOne.reset()
    this.controllerPlayerTwo.reset()
    this.statistics.reset()
  }

  addEntity(entity: Entity) {
    this.loop.add(entity)
    this.view.add(entity)
    this.zone.add(entity)
    this.audioManager.add(entity)
    this.statistics.add(entity)
  }

  updateLeaderboard(data: StatisticsData) {
    store.dispatch(
      addUser({
        data: {
          date: new Date().toISOString(),
          levels: this.state.level,
          nickname: store.getState().user.user?.display_name || 'Fancy Unicorn',
          score: data.score,
        },
        teamName: TEAM_NAME,
        ratingFieldName: 'score',
      })
    )
    if (this.state.username) {
      this.emit(GameEvents.UpdateLeaderboard, { username: this.state.username, ...data })
    }
  }

  initLoading() {
    this.state.screen = ScreenType.Loading
    this.overlay.show(this.state.screen)
    this.resources.on(ResourcesEvent.Loaded, () => {
      this.initMenu()
    })
  }

  initMenu() {
    this.reset()

    this.state.screen = ScreenType.MainMenu
    this.overlay.show(this.state.screen, this.state.mainMenuItem)
    this.controllerAll
      .on(ControllerEvent.Move, (direction: Direction) => {
        if (this.state.screen !== ScreenType.MainMenu) {
          return
        }

        if (direction === Direction.Up || direction === Direction.Down) {
          this.overlay.changeMainMenuItem(direction)
        }

        this.overlay.show(this.state.screen, this.state.mainMenuItem)
      })
      .on(ControllerEvent.Shoot, async () => {
        if (this.state.screen !== ScreenType.MainMenu) {
          return
        }

        await this.initLevelSelector()

        this.initGameLevel(true)
      })
  }

  initLevelSelector() {
    return new Promise<void>((resolve) => {
      this.reset()

      this.state.screen = ScreenType.LevelSelector
      this.overlay.show(ScreenType.LevelSelector, {
        level: this.state.level,
        showHints: true,
      })

      let changeLevelInterval: ReturnType<typeof setInterval>

      const resetLevelInterval = () => changeLevelInterval && clearInterval(changeLevelInterval)
      const handleMove = (direction: Direction) => {
        let shouldTrigger = false
        if ((direction === Direction.Up || direction === Direction.Right) && this.state.level < this.state.maxLevels) {
          this.state.level++
          shouldTrigger = true
        } else if ((direction === Direction.Down || direction === Direction.Left) && this.state.level > 1) {
          this.state.level--
          shouldTrigger = true
        } else {
          resetLevelInterval()
        }
        if (shouldTrigger) {
          this.overlay.show(ScreenType.LevelSelector, {
            level: this.state.level,
          })
        }
      }

      this.controllerAll
        .on(ControllerEvent.Stop, () => {
          if (this.state.screen === ScreenType.LevelSelector) {
            resetLevelInterval()
          }
        })
        .on(ControllerEvent.Move, (direction: Direction) => {
          if (this.state.screen !== ScreenType.LevelSelector) {
            return
          }

          resetLevelInterval()
          handleMove.call(this, direction)

          changeLevelInterval = setInterval(handleMove.bind(this, direction), 130)
        })
        .on(ControllerEvent.Shoot, () => {
          if (this.state.screen !== ScreenType.LevelSelector) {
            return
          }
          resolve()
        })
        .on(ControllerEvent.Escape, () => {
          this.initMenu()
        })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initGameLevel(_firstInit = false) {
    this.reset()

    this.state.mode =
      this.state.mainMenuItem === MainMenuItem.Singleplayer ? MainMenuItem.Singleplayer : MainMenuItem.Multiplayer

    if (_firstInit) {
      this.statistics.startSession(this.state.mode)
    } else {
      if (this.state.level < this.state.maxLevels) {
        this.state.level++
      } else {
        this.state.level = 1
      }
    }

    this.audioManager.emit('levelIntro')

    this.statistics.startMap()

    this.scenario = new Scenario(this)
      .on(ScenarioEvent.GameOver, async () => {
        this.statistics.finishSession()
        this.state.resetSession()
        await this.initGameOverPopup()
        await this.initGameScore()
        this.initMenu()
      })
      .on(ScenarioEvent.MissionAccomplished, async () => {
        this.statistics.finishMap()
        await sleep(this.state.missionAccomplishedRedirectTimeout)
        await this.initGameScore()
        this.initGameLevel()
      })
  }

  initGameScore() {
    return new Promise<void>((resolve) => {
      const meta = { level: this.state.level, username: this.state.username }
      const stats = this.statistics.getCurrentStatistics()
      this.reset()
      this.state.screen = ScreenType.Score
      this.overlay.show(this.state.screen, { ...meta, ...stats })

      this.overlay.on('score', () => {
        this.audioManager.emit('score')
      })

      const skip = () => {
        this.overlay.show(this.state.screen, { ...meta, ...stats, skip: true })
        this.controllerAll.offAll(ControllerEvent.Escape)
        this.controllerAll.on(ControllerEvent.Escape, resolve)
        this.controllerAll.offAll(ControllerEvent.Shoot)
        this.controllerAll.on(ControllerEvent.Shoot, resolve)
      }

      this.controllerAll.on(ControllerEvent.Escape, skip).on(ControllerEvent.Shoot, skip)
      setTimeout(resolve, this.state.scoreScreenTimeout)
    })
  }

  initGameOverPopup() {
    return new Promise<void>((resolve) => {
      if (this.state.screen === ScreenType.GameOverPopup) {
        return
      }

      this.state.screen = ScreenType.GameOverPopup
      this.state.level = 0
      this.overlay.show(this.state.screen)
      this.audioManager.emit('gameOver')

      this.controllerAll.reset()
      this.controllerPlayerOne.reset()
      this.controllerPlayerTwo.reset()

      this.controllerAll.on(ControllerEvent.Escape, resolve)
      setTimeout(resolve, this.state.gameOverPopupTimeout)
    })
  }

  private createController(keyBinding: BindingConfig) {
    return new ControllerManager(this, [new ControllerKeyboard(keyBinding)])
  }
}
