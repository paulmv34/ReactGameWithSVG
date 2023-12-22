import { type AssetPathList } from './types'

export const errorMsg = 'Не удалось загрузить данные для игры. Попробуйте обновить страницу.'

export enum SpriteName {
  Brick = 'BRICK',
  Sprite = 'SPRITE',
}

export const ImagePathList = {
  [SpriteName.Sprite]: 'sprites/sprite.png',
  [SpriteName.Brick]: 'sprites/bricks.png',
}

export enum SoundPathList {
  enemyExplosion = 'sounds/enemy-explosion.mp3',
  gameOver = 'sounds/game-over.mp3',
  hitBrick = 'sounds/hit-brick.mp3',
  hitEnemy = 'sounds/hit-enemy.mp3',
  hitSteel = 'sounds/hit-steel.mp3',
  ice = 'sounds/ice.mp3',
  idle = 'sounds/tank-idle.mp3',
  levelIntro = 'sounds/level-intro.mp3',
  lifePickup = 'sounds/life.mp3',
  move = 'sounds/tank-move.mp3',
  pause = 'sounds/pause.mp3',
  playerExplosion = 'sounds/player-explosion.mp3',
  powerupAppear = 'sounds/powerup-appear.mp3',
  powerupPickup = 'sounds/powerup-pickup.mp3',
  // Нужны два одинаковых звука, иначе из-за быстрого проигрывания происходят искажения
  score = 'sounds/score.mp3',
  score2 = 'sounds/score.mp3',
  shoot = 'sounds/shoot.mp3',
}

export const assetPathList: AssetPathList = { ...ImagePathList, ...SoundPathList }

export const extensionList = {
  images: ['png', 'svg', 'jpg', 'jpeg', 'gif'],
  sounds: ['mp3'],
}

export enum ResourcesEvent {
  Error = 'ERROR',
  Loaded = 'LOADED',
}
