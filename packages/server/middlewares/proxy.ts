import type { RequestHandler } from 'express'
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'

import { allowedHosts, YANDEX_API } from '../config'
import { User } from '../models/User'

export const proxyMiddleware: RequestHandler = (req, res, next) => {
  if (!allowedHosts.includes(req.hostname)) {
    res.statusCode = 403
    res.send('<!doctype html><p>Forbidden</p>')
    return
  }

  return createProxyMiddleware({
    target: YANDEX_API,
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
    selfHandleResponse: true,
    logLevel: 'error',
    onProxyRes: responseInterceptor(async (responseBuffer) => {
      if (req.url.includes('/auth/user') && req.method === 'GET') {
        const response = responseBuffer.toString()
        let user
        try {
          user = JSON.parse(response)
        } catch (e) {
          user = null
        }
        if (user && user.id) {
          try {
            await User.upsert({
              ya_id: user.id,
              login: user.login,
              display_name: user.display_name,
              avatar: user.avatar,
            })
          } catch (e) {
            console.error(e)
          }
        }
      }
      return responseBuffer
    }),
  })(req, res, next)
}
