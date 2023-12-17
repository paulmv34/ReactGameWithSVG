declare module '*.scss'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.svg'

declare global {
  const __API_HOST__: string
  const __SLACK_FEEDBACK_WEBHOOK_URL__: string
  interface Window {
    __PRELOADED_STATE__?: Record<string, Record<string, unknown>>
  }

  export type Nullable<T> = T | null

  export type TupleArray<T, len extends number> = [T, ...T[]] & { length: len }
  interface Array<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findLast(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): T
  }
}

export {}
