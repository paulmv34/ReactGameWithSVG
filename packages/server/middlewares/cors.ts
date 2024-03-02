import cors from 'cors'

export const corsMiddleware = () => {
  const serverPort = Number(process.env.SERVER_PORT) || 3001
  const API_HOST = typeof process !== 'undefined' ? process.env?.API_HOST + ':' + serverPort : ''
  const origins = [`http://127.0.0.1:${serverPort}`, `http://localhost:${serverPort}`]
  if (API_HOST !== '') origins.push(API_HOST)

  const corsOptions = {
    credentials: true,
    origin: origins,
    optionsSuccessStatus: 200,
  }

  return cors(corsOptions)
}
