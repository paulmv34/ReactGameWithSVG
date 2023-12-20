import { Color } from '@/mechanics/services/View/colors'
import { Screen } from '../Screen'
import { type LevelSelectorScreenProps } from './types'

export class LevelSelectorScreen extends Screen<LevelSelectorScreenProps> {
  show({ level, showHints = true }: LevelSelectorScreenProps) {
    const text = `УРОВЕНЬ ${level.toString().padStart(2, ' ')}`

    this.overlay.renderSplashScreen(Color.White)

    this.overlay.renderElement({
      posX: 0,
      posY: Math.round(this.overlay.view.height / 2) - 2,
      width: this.overlay.view.width,
      height: 2,
      color: Color.Black,
      text: text,
      align: 'center',
    })

    if (showHints) {
      this.overlay.renderElement({
        posX: 0,
        posY: 30,
        width: this.overlay.view.width,
        height: 1,
        color: Color.Black,
        text: 'Для выбора воспользуйтесь стрелками на клавиатуре',
        align: 'center',
      })
    }
  }
}
