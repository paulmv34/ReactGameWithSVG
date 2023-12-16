export type LoopDelays = Record<number, Array<() => void>>

export type LoopIntervals = Record<string, LoopInterval>

export type LoopInterval = {
  callback: () => void
  loopCounter: number
  targetLoop: number
}
