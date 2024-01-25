/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined

  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server 😅')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: (url: string) => Promise<string>

      // if (!isDev()) {
      //   template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      // } else {
      //   template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
      //   template = await vite!.transformIndexHtml(url, template)
      // }
      //
      //
      // if (!isDev()) {
      //   render = (await import(ssrClientPath)).render(url)
      // } else {
      //   render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
      // }

      if (isDev()) {
        // Always read fresh template in development
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
      } else {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
        render = (await import(ssrClientPath)).render
      }

      const appHtml = await render(url)
      // eslint-disable-next-line
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

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
