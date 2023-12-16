import { Color } from '@/mechanics/services/View/colors'
import { spriteCoordinates } from '@/mechanics/services/View/spriteCoordinates'
import { Screen } from '../Screen'
import { MainMenuItem } from './data'

export class MainMenuScreen extends Screen<MainMenuItem> {
  tankElemInterval: string | null = null
  mainMenuStateXPos = 19

  mainMenuStateYPos = {
    [MainMenuItem.Singleplayer]: 28,
    [MainMenuItem.Multiplayer]: 33,
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
      height: 4,
      text: 'ТАНЧИКИ',
      align: 'center',
      color: Color.Lime,
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
  }
}
