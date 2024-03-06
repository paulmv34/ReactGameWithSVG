import type { RequestHandler } from 'express'

export const checkAuthMiddlewareYandex: RequestHandler = async (req, res, next) => {
  const YANDEX_API = 'https://ya-praktikum.tech/api/v2'
  if (req.headers.cookie) {
    fetch(`${YANDEX_API}/auth/user`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
      .then((isAuth) => {
        if (isAuth.ok) {
          isAuth
            .json()
            .then((user) => {
              res.locals.user = user
              next()
            })
            .catch(next)
        } else {
          next()
        }
      })
      .catch(next)
  } else {
    next()
  }
}

export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
  // пользователь сам отправляет свои данные к запросу, пока не настроим nginx и не прикрутим ssl
  if (req.query.user_id) {
    res.locals.user = { id: req.query.user_id }
  }
  next()
}
