import { Player } from '../Scenario/data'

export const playerLivesData = {
  [Player.Player1]: { header: '1:', posY: 30 },
  [Player.Player2]: { header: '2:', posY: 33 },
}

export enum IndicatorNames {
  Flag = 'FLAG',
  Level = 'LEVEL',
  Lives = 'LIVES',
  PlayerHeader = 'PLAYER_HEADER',
  PlayerIcon = 'PLAYER_ICON',
  TankEnemy = 'ENEMY_TANK_ICON',
}
