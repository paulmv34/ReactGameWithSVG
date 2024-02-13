import { Themes } from '@/types/types'
import { FunctionComponent, SVGProps } from 'react'

type ThemeItem = {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
  name: Themes
}

export type ThemeList = ThemeItem[]
