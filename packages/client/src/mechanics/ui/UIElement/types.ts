import { type Pos, type Size } from '@/mechanics/models/Entity/types'
import { type Color } from '@/mechanics/services/View/colors'
import { type SpriteCoordinatesNoAnimations } from '@/mechanics/services/View/types'

export type UIElementSettings = Pos &
  Size &
  Partial<{
    align: CanvasTextAlign
    backColor: Color | string
    backImg: HTMLImageElement | HTMLCanvasElement
    color: Color | string
    indicatorName?: string
    mainSpriteCoordinates: SpriteCoordinatesNoAnimations
    text: string
  }>
