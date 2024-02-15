import * as path from 'path'
import { type SequelizeOptions, Sequelize } from 'sequelize-typescript'

import { ForumSection } from '../models/ForumSection'
import { Themes } from '../models/Themes'

const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } = process.env

export const initPostgre = async (): Promise<Sequelize | undefined> => {
  let client

  try {
    const sequelizeOptions: SequelizeOptions = {
      username: POSTGRES_USER,
      host: POSTGRES_HOST ?? 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
    }

    client = new Sequelize(sequelizeOptions)

    const modelsPath = path.join(__dirname, '../models')
    client.addModels([modelsPath])

    const synced = await client.sync({ alter: true })

    if (synced) {
      console.log('Synchronized the Postgres database')

      await ForumSection.bulkCreate(
        [{ name: 'Игра' }, { name: 'Обратная связь' }, { name: 'Как попасть в топ???' }, { name: 'Механики игры' }],
        {
          ignoreDuplicates: true,
        }
      )

      await Themes.bulkCreate([{ theme_name: 'system' }, { theme_name: 'light' }, { theme_name: 'dark' }], {
        ignoreDuplicates: true,
      })
    }

    console.log('Connected to the Postgres database')
  } catch (e) {
    console.error(e)
  }

  return client
}
