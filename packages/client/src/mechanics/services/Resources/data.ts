import { type AssetPathList } from './types'

export const errorMsg =
  'Не удалось загрузить данные для игры. Попробуйте обновить страницу.'

export enum SpriteName {
  Brick = 'BRICK',
  Sprite = 'SPRITE',
}

export const ImagePathList = {
  [SpriteName.Sprite]: 'sprites/sprite.png',
}

export const assetPathList: AssetPathList = { ...ImagePathList }

export const extensionList = {
  images: ['png', 'svg', 'jpg', 'jpeg', 'gif'],
}

export enum ResourcesEvent {
  Error = 'ERROR',
  Loaded = 'LOADED',
}
