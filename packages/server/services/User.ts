import express, { type Request, type Response, Router } from 'express'

import { checkAuthMiddleware } from '../middlewares'
import { User } from '../models/User'

export const userRoute = Router()
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use('/', checkAuthMiddleware)
  .post('/', async (req: Request, res: Response): Promise<Response> => {
    if (req.body.id) {
      try {
        await User.upsert({
          ya_id: req.body.id,
          login: req.body.login,
          display_name: req.body.display_name,
          avatar: req.body.avatar,
        })
        return res.status(201).json('ok')
      } catch (e) {
        console.error(e)
        return res.status(500).json('invalid data or DB error')
      }
    } else {
      return res.status(400).json('Доступ запрещен')
    }
  })
