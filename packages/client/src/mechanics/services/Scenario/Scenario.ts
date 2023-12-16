import {
  type Entity,
  type PlayerVariant,
  type Bullet,
  Flag,
  TankEnemy,
  TankPlayer,
  Terrain,
} from '@/mechanics/models'
import {
  type Direction,
  type EntitySettings,
  EntityEvent,
} from '@/mechanics/models/Entity/types'
import { EventEmitter } from '@/mechanics/utils'
import { type Game, MapManager } from '..'
import { ControllerEvent } from '../Controller/data'
import { spawnPlaces } from '../MapManager/data'
import { Player, playerInitialSettings } from './data'
import { ScenarioEvent } from './types'

export { ScenarioEvent }

export class Scenario extends EventEmitter<ScenarioEvent> {
  mapManager: MapManager

  activeEnemies: TankEnemy[] = []
  maxTotalEnemies = 20
  maxActiveEnemies = 4
  enemiesSpawnDelay = 1000
  enemiesSpawnCounter = 0

  constructor(private game: Game) {
    super()
    this.mapManager = new MapManager(game)

    this.createTerrain()
    this.createEnemies()
    this.createPlayers()
  }

  createTerrain() {
    this.createBoundaries()
    const map = this.mapManager.getMap()
    const entities = this.mapManager.mapDataToEntitySettings(map)
    entities.forEach((settings) => {
      this.createEntity(settings)
    })
  }

  createEntity(props: EntitySettings) {
    let entity: Entity
    if (props.type === 'flag') {
      entity = new Flag(props).on(EntityEvent.Destroyed, () => {
        this.emit(ScenarioEvent.GameOver)
      })
    } else {
      entity = new Terrain(props)
    }
    this.game.addEntity(entity)
    entity.spawn(props)
  }

  createBoundaries() {
    const settings = this.game.state
    this.createEntity({
      type: 'boundary',
      width: settings.width,
      height: settings.boundarySize,
      posX: 0,
      posY: 0,
    })
    this.createEntity({
      type: 'boundary',
      width: settings.width,
      height: settings.boundarySize,
      posX: 0,
      posY: settings.height - settings.boundarySize,
    })
    this.createEntity({
      type: 'boundary',
      width: settings.boundarySize,
      height: settings.height - settings.boundarySize * 2,
      posX: 0,
      posY: settings.boundarySize,
    })
    this.createEntity({
      type: 'boundary',
      width: settings.boundarySize + settings.indicatorsSidebarSize,
      height: settings.height - settings.boundarySize * 2,
      posX:
        settings.width - settings.boundarySize - settings.indicatorsSidebarSize,
      posY: settings.boundarySize,
    })
  }

  createEnemies() {
    if (this.game.state.mode === 'SINGLEPLAYER') {
      this.maxTotalEnemies = this.game.state.singleplayerMaxTotalEnemies
      this.maxActiveEnemies = this.game.state.singleplayerMaxActiveEnemies
      this.enemiesSpawnDelay = this.game.state.singleplayerEnemiesSpawnDelay
    } else if (this.game.state.mode === 'MULTIPLAYER') {
      this.maxTotalEnemies = this.game.state.multiplayerMaxTotalEnemies
      this.maxActiveEnemies = this.game.state.multiplayerMaxActiveEnemies
      this.enemiesSpawnDelay = this.game.state.multiplayerEnemiesSpawnDelay
    }

    this.createTankEnemy()
    this.game.loop.setLoopInterval(
      () => {
        if (this.canCreateTankEnemy()) {
          this.createTankEnemy()
        }
      },
      this.enemiesSpawnDelay,
      'SCENARIO_ENEMY_TANK_CREATION'
    )
  }

  canCreateTankEnemy() {
    return (
      this.activeEnemies.length < this.maxActiveEnemies &&
      this.enemiesSpawnCounter < this.maxTotalEnemies
    )
  }

  createTankEnemy() {
    ++this.enemiesSpawnCounter

    const tankEnemySettings = {
      variant: this.mapManager.getMapTankEnemyVariant(this.enemiesSpawnCounter),
    }

    const entity = new TankEnemy(tankEnemySettings)
    this.game.addEntity(entity)
    this.activeEnemies.push(entity)

    entity
      .on(EntityEvent.Shoot, (bullet) => {
        this.createBullet(bullet)
      })
      .on(EntityEvent.Destroyed, () => {
        this.activeEnemies = this.activeEnemies.filter(
          (enemy) => enemy !== entity
        )

        if (!this.canCreateTankEnemy() && this.activeEnemies.length === 0) {
          this.emit(ScenarioEvent.MissionAccomplished)
        }
      })

    this.trySpawnTankEnemy(entity)
  }

  trySpawnTankEnemy(entity: TankEnemy) {
    const spawnPlaceKey = Math.floor(Math.random() * spawnPlaces[0].length)
    const spawnPlace = this.mapManager.coordsToRect(
      spawnPlaces[0][spawnPlaceKey],
      0
    )

    if (!entity.spawn(spawnPlace)) {
      this.game.loop.setLoopDelay(
        this.trySpawnTankEnemy.bind(this, entity),
        this.game.state.tankRespawnRetryInterval
      )
    }
  }
  createPlayers() {
    if (this.game.state.mode === 'SINGLEPLAYER') {
      this.createPlayerTank(Player.Player1)
    } else if (this.game.state.mode === 'MULTIPLAYER') {
      this.createPlayerTank(Player.Player1)
      this.createPlayerTank(Player.Player2)
    }
  }

  createPlayerTank(playerType: Player = Player.Player1) {
    const settings = playerInitialSettings[playerType]

    const playerState = this.getPlayerState(playerType)
    settings.upgradeTier = 1

    const entity = new TankPlayer(settings)
    this.game.addEntity(entity)

    entity
      .on(EntityEvent.Shoot, (bullet) => {
        this.createBullet(bullet)
      })
      .on(EntityEvent.Destroyed, () => {
        --playerState.lives

        const playerOneIsOut = this.game.state.playerOne.lives < 0
        const playerTwoIsOut =
          this.game.state.mode === 'SINGLEPLAYER' ||
          this.game.state.playerTwo.lives < 0

        if (playerOneIsOut && playerTwoIsOut) {
          this.emit(ScenarioEvent.GameOver)
        }

        if (playerState.lives >= 0) {
          this.createPlayerTank(playerType)
        }
      })

    if (playerState.lives < 0) {
      playerState.lives = 0
    }
    this.trySpawnTankPlayer(entity)

    this.on(ScenarioEvent.GameOver, () => {
      if (entity && entity.spawned) {
        entity.frozen = true
        entity.stop()
      }
      entity.on(EntityEvent.Ready, () => {
        entity.frozen = true
        entity.stop()
      })
    })

    const controller = this.getPlayerController(playerType)
    controller
      .offAll(ControllerEvent.Move)
      .on(ControllerEvent.Move, (direction: Direction) => {
        entity.move(direction)
      })
      .offAll(ControllerEvent.Stop)
      .on(ControllerEvent.Stop, () => {
        entity.stop()
      })
      .offAll(ControllerEvent.Shoot)
      .on(ControllerEvent.Shoot, () => {
        entity.shoot()
      })
  }

  trySpawnTankPlayer(entity: TankPlayer) {
    entity.spawn()
    if (!entity.spawned) {
      this.game.loop.setLoopDelay(
        this.trySpawnTankPlayer.bind(this, entity),
        this.game.state.tankRespawnRetryInterval
      )
    }
  }

  getPlayerState(playerType: Player | PlayerVariant) {
    return playerType === Player.Player1
      ? this.game.state.playerOne
      : this.game.state.playerTwo
  }

  getPlayerController(playerType: Player) {
    if (this.game.state.mode === 'MULTIPLAYER') {
      if (playerType === Player.Player1) {
        return this.game.controllerPlayerOne
      } else if (playerType === Player.Player2) {
        return this.game.controllerPlayerTwo
      }
    }

    return this.game.controllerAll
  }

  createBullet(bullet: Bullet | null) {
    if (!bullet) {
      return null
    }
    this.game.addEntity(bullet)
    bullet.spawn({ posX: bullet.posX, posY: bullet.posY })
    bullet.update()
  }
}
