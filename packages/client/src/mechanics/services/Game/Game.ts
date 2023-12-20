import { type Entity } from '@/mechanics/models'
import { Direction } from '@/mechanics/models/Entity/types'
import { Overlay } from '@/mechanics/ui'
import { ScreenType } from '@/mechanics/ui/screens/data'
import { MainMenuItem } from '@/mechanics/ui/screens/UIScreens/data'
import { EventEmitter, sleep } from '../../utils'
import {
  ControllerKeyboard,
  ControllerManager,
  Loop,
  Resources,
  ResourcesEvent,
  Scenario,
  ScenarioEvent,
  State,
  View,
  Zone,
} from '..'
import { type Controller, ControllerEvent } from '../Controller'
import {
  type BindingConfig,
  KeyBindingsArrows,
  KeyBindingsWasd,
} from '../Controller/KeyBindings'

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
    this.controllerAll.load()
    this.controllerPlayerOne.load()
    this.controllerPlayerTwo.load()
  }

  unload() {
    this.clearAllListeners()
    this.state.unload()
    this.loop.unload()
    this.view.unload()
    this.overlay.unload()
    this.controllerAll.unload()
    this.controllerPlayerOne.unload()
    this.controllerPlayerTwo.unload()
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
    this.controllerAll.reset()
    this.controllerPlayerOne.reset()
    this.controllerPlayerTwo.reset()
  }

  addEntity(entity: Entity) {
    this.loop.add(entity)
    this.view.add(entity)
    this.zone.add(entity)
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

      const resetLevelInterval = () =>
        changeLevelInterval && clearInterval(changeLevelInterval)
      const handleMove = (direction: Direction) => {
        let shouldTrigger = false
        if (
          (direction === Direction.Up || direction === Direction.Right) &&
          this.state.level < this.state.maxLevels
        ) {
          this.state.level++
          shouldTrigger = true
        } else if (
          (direction === Direction.Down || direction === Direction.Left) &&
          this.state.level > 1
        ) {
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

          changeLevelInterval = setInterval(
            handleMove.bind(this, direction),
            130
          )
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
      this.state.mainMenuItem === MainMenuItem.Singleplayer
        ? MainMenuItem.Singleplayer
        : MainMenuItem.Multiplayer

    if (this.state.level < this.state.maxLevels) {
      this.state.level++
    } else {
      this.state.level = 1
    }

    this.scenario = new Scenario(this)
      .on(ScenarioEvent.GameOver, async () => {
        this.state.resetSession()
        await this.initGameOverPopup()
        this.initMenu()
      })
      .on(ScenarioEvent.MissionAccomplished, async () => {
        await sleep(this.state.missionAccomplishedRedirectTimeout)
        this.initGameLevel()
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
