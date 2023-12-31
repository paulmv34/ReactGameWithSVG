import { Color } from '@/mechanics/services/View/colors'
import { Screen } from '../Screen'

export class GameStartScreen extends Screen<number> {
  show() {
    this.overlay.animate(this.updateStage.bind(this))
  }

  updateStage(stage = 0) {
    const { view } = this.overlay
    const width = view.width
    const height = Math.round(view.height / 2) - stage

    if (height < 0) {
      return false
    }

    this.overlay.clearScreen()
    this.overlay.renderElement({
      posX: 0,
      posY: 0,
      width,
      height,
      color: Color.Grey,
    })

    return true
  }
}
