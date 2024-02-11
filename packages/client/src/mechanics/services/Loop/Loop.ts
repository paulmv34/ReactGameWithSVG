import { type Entity, Bullet, Tank } from '@/mechanics/models'
import { EntityEvent } from '@/mechanics/models/Entity/types'
import { type LoopDelays, type LoopIntervals } from './types'

export class Loop {
  loopTimeMs = 16
  maxConsecutiveLoops = 4
  loopCount = 0
  loopDelays: LoopDelays = {}
  loopIntervals: LoopIntervals = {}
  loopEntities: Set<Tank | Bullet> = new Set()
  active = false
  lastTimestamp = 0

  load() {
    this.start()
  }

  unload() {
    this.stop()
    this.reset()
  }

  reset() {
    this.clearLoopEntities()
    this.loopIntervals = {}
    this.clearLoopDelays()
  }

  start() {
    this.active = true
    this.lastTimestamp = 0
    this.loop()
  }

  stop() {
    this.active = false
  }

  add(entity: Entity) {
    this.registerTimerHandlers(entity)
    if (entity instanceof Tank) {
      this.loopEntities.add(entity)
    } else if (entity instanceof Bullet) {
      const tempLoopEntitiesArray = Array.from(this.loopEntities)
      tempLoopEntitiesArray.unshift(entity)
      this.loopEntities = new Set(tempLoopEntitiesArray)
    }
  }

  clearLoopEntities() {
    for (const entity of this.loopEntities) {
      entity.despawn()
    }
    this.loopEntities = new Set()
  }

  tick() {
    ++this.loopCount
    this.checkLoopDelays()
    this.checkLoopIntervals()
    for (const entity of this.loopEntities) {
      entity.update()
      if (entity.shouldBeDestroyed) {
        this.loopEntities.delete(entity)
      }
    }
  }

  loop(timestamp = 0) {
    if (!this.active) {
      return
    }

    if (timestamp) {
      const timeDifference = timestamp - this.lastTimestamp

      if (timeDifference >= this.loopTimeMs) {
        if (this.lastTimestamp !== 0) {
          const ticksCount = Math.min(Math.round(timeDifference / this.loopTimeMs), this.maxConsecutiveLoops)

          for (let i = ticksCount; i > 0; --i) {
            this.tick()
          }
        }

        this.lastTimestamp = timestamp
      }
    }

    requestAnimationFrame(this.loop.bind(this))
  }

  convertTimeToLoops(delay: number) {
    return Math.floor(delay / this.loopTimeMs)
  }

  setLoopDelay(callback: () => void, delay: number) {
    let loopMark = this.loopCount + this.convertTimeToLoops(delay)

    if (loopMark === this.loopCount) {
      ++loopMark
    }

    if (!this.loopDelays[loopMark]) {
      this.loopDelays[loopMark] = []
    }

    this.loopDelays[loopMark].push(callback)
  }

  clearLoopDelays() {
    this.loopCount = 0
    this.loopDelays = {}
  }

  setLoopInterval(callback: () => void, delay: number, intervalName: string) {
    this.loopIntervals[intervalName] = {
      loopCounter: 0,
      targetLoop: this.convertTimeToLoops(delay),
      callback: callback,
    }

    return intervalName
  }

  clearLoopInterval(intervalName: string) {
    if (intervalName in this.loopIntervals) {
      delete this.loopIntervals[intervalName]
    }
  }

  registerTimerHandlers(entity: Entity) {
    entity.on(EntityEvent.SetLoopDelay, this.setLoopDelay.bind(this))
    entity.on(EntityEvent.SetLoopInterval, this.setLoopInterval.bind(this))
    entity.on(EntityEvent.ClearLoopInterval, this.clearLoopInterval.bind(this))
  }

  checkLoopDelays() {
    if (this.loopDelays[this.loopCount]) {
      const delayedCallbacks = this.loopDelays[this.loopCount]
      for (const callback of delayedCallbacks) {
        callback()
      }
      delete this.loopDelays[this.loopCount]
    }
  }

  checkLoopIntervals() {
    Object.values(this.loopIntervals).forEach((interval) => {
      if (interval.loopCounter === interval.targetLoop) {
        interval.callback()
        interval.loopCounter = 0
        return
      }
      interval.loopCounter++
    })
  }
}
