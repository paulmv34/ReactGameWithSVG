import { Entity } from '@/mechanics/models'
import { EntityEvent } from '@/mechanics/models/Entity/types'
import { type UIElementSettings } from './types'

export class UIElement extends Entity {
  text = ''
  align: CanvasTextAlign = 'left'
  spawned = true
  indicatorName = ''

  constructor(props: UIElementSettings) {
    super(props)
    this.type = props.indicatorName ? 'indicator' : 'custom'
    Object.assign(this, props)
  }

  render() {
    const newState = { posX: this.posX, posY: this.posY }
    if (this.text) {
      this.emit(EntityEvent.ShouldRenderText, newState)
    } else {
      this.emit(EntityEvent.ShouldUpdate, newState)
      this.emit(EntityEvent.DidUpdate, newState)
    }
  }
}
