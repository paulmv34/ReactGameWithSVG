import type { Response } from 'express'

/**
 *
 * @param fn
 * @param responseObject
 * @param errorStatus
 * @param errorMessage
 */
export const throwIfError =
  (fn: (result: unknown) => unknown, responseObject: Response, errorStatus: number, errorMessage: string) =>
  (result: unknown) => {
    if (fn(result)) {
      responseObject.status(errorStatus || 500).json({
        type: 'error',
        message: errorMessage,
      })
    }
    return result
  }
