import { type SoundPathList } from '../Resources/data'

export type ActivatedSounds = Record<keyof typeof SoundPathList, ActiveSound>

type ActiveSound = {
  audio: AudioBufferSourceNode
  isEnded?: boolean
  isPlaying: boolean
  resumeFrom: number
  startTime: number
}
