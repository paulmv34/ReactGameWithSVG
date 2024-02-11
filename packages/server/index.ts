/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'

dotenv.config()

import { corsMiddleware, requestDataSaverMiddleware } from './middlewares'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { initPostgre } from './utils/database'
import { apiRoute } from './routes/Api'

const isDev = () => process.env.NODE_ENV === 'development'

// initPostgre()

async function startServer() {
  await initPostgre()
  const app = express()
  app.use([corsMiddleware(), requestDataSaverMiddleware]).use('/api', apiRoute)

  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distIndexPathname = isDev() ? 'client/dist/index.html' : './client/dist/index.html'
  const ssrClientPathname = isDev() ? 'client/ssr-dist/client.cjs' : './client/ssr-dist/client.cjs'
  const srcPathname = isDev() ? 'client' : './client'
  const distPath = path.dirname(require.resolve(distIndexPathname))
  const ssrClientPath = require.resolve(ssrClientPathname)
  const srcPath = () => path.dirname(require.resolve(srcPathname))

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath(),
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/sounds', express.static(path.resolve(distPath, 'sounds')))
    app.use('/sprites', express.static(path.resolve(distPath, 'sprites')))
    app.use('/images', express.static(path.resolve(distPath, 'images')))
    app.use('/serviceWorker.js', express.static(path.resolve(distPath, 'serviceWorker.js')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: (url: string) => Promise<string>

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      } else {
        template = fs.readFileSync(path.resolve(srcPath(), 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath(), 'ssr.tsx'))).render
      }

      const [appHtml, preloadedState] = await render(url)

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--state-outlet-->`,
          `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
