import { Color } from '@/mechanics/services/View/colors'
import { Screen } from '../Screen'

export class GameOverPopupScreen extends Screen {
  show() {
    this.overlay.animate(this.updateStage.bind(this))
  }

  updateStage(counter = 0) {
    const { view } = this.overlay
    const fontSize = 5
    const posY = view.height - counter
    const middle = (view.height - fontSize) / 2
    const opacity = counter <= 10 ? counter * 0.05 : 0.5

    if (posY < middle) {
      return false
    }

    this.overlay.clearScreen()

    this.overlay.renderElement({
      posX: 0,
      posY: 0,
      width: view.width,
      height: view.height,
      color: `rgba(0,0,0,${opacity})`,
    })

    this.overlay.renderElement({
      posX: 0,
      posY,
      width: view.width,
      height: fontSize,
      text: 'УБИТ',
      color: Color.Red,
      align: 'center',
    })

    return true
  }
}
