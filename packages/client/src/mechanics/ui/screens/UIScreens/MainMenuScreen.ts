import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { Screen } from '../Screen'
import { MainMenuItem } from './data'
import { SpriteName } from '@/mechanics/services/Resources/data'

export class MainMenuScreen extends Screen<MainMenuItem> {
  tankElemInterval: string | null = null
  mainMenuStateXPos = 19

  mainMenuStateYPos = {
    [MainMenuItem.Singleplayer]: 20,
    [MainMenuItem.Multiplayer]: 25,
  }

  show(menuItem: MainMenuItem) {
    const verticalCenteringCorrection = -1

    this.render()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const menuSwitcher = this.overlay.renderElement({
      posX: this.mainMenuStateXPos - 6,
      posY: this.mainMenuStateYPos[menuItem] + verticalCenteringCorrection,
      width: 4,
      height: 4,
      color: Color.Yellow,
      backColor: Color.Black,
      mainSpriteCoordinates: spriteCoordinates['base.heart.alive'],
    })
  }

  render() {
    const { view } = this.overlay

    this.overlay.renderSplashScreen()

    this.overlay.renderElement({
      posX: 0,
      posY: 7,
      width: view.width,
      height: 5,
      backImg: this.overlay.game.resources.getImage(SpriteName.Brick),
      text: 'ТАНЧИКИ',
      align: 'center',
    })

    this.overlay.renderElement({
      posX: this.mainMenuStateXPos,
      posY: this.mainMenuStateYPos[MainMenuItem.Singleplayer],
      width: 24,
      height: 2.2,
      color: Color.White,
      text: '1 ИГРОК',
    })

    this.overlay.renderElement({
      posX: this.mainMenuStateXPos,
      posY: this.mainMenuStateYPos[MainMenuItem.Multiplayer],
      width: 20,
      height: 2.2,
      color: Color.White,
      text: '2 ИГРОКА',
    })

    this.overlay.renderElement({
      posX: 0,
      posY: 34,
      width: view.width,
      height: 1,
      color: Color.LightGrey,
      text: '1 ИГРОК',
      align: 'center',
    })

    this.overlay.renderElement({
      posX: 0,
      posY: 36,
      width: view.width,
      height: 1,
      color: Color.LightGrey,
      text: 'WASD или СТРЕЛКИ для движения',
      align: 'center',
    })

    this.overlay.renderElement({
      posX: 0,
      posY: 38,
      width: view.width,
      height: 1,
      color: Color.LightGrey,
      text: 'ПРОБЕЛ или ENTER для стрельбы',
      align: 'center',
    })

    this.overlay.renderElement({
      posX: 0,
      posY: 42,
      width: view.width,
      height: 1,
      color: Color.LightGrey,
      text: '2 ИГРОКА',
      align: 'center',
    })

    this.overlay.renderElement({
      posX: 0,
      posY: 44,
      width: view.width,
      height: 1,
      color: Color.LightGrey,
      text: '1 - WASD для движения, ПРОБЕЛ для стрельбы',
      align: 'center',
    })

    this.overlay.renderElement({
      posX: 0,
      posY: 46,
      width: view.width,
      height: 1,
      color: Color.LightGrey,
      text: '2 - СТРЕЛКИ для движения, ENTER для стрельбы',
      align: 'center',
    })

    this.overlay.renderElement({
      posX: 0,
      posY: 52,
      width: view.width,
      height: 1.5,
      color: Color.LightGrey,
      text: 'Нажмите F для игры на полном экране',
      align: 'center',
    })
  }
}
