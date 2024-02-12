import * as path from 'path'
import { type SequelizeOptions, Sequelize } from 'sequelize-typescript'

import { ForumSection } from '../models/ForumSection'
import { Themes } from '../models/Themes'

export const initPostgre = async (): Promise<Sequelize | undefined> => {
  let client

  console.log(process.env.POSTGRES_DB)

  try {
    const sequelizeOptions: SequelizeOptions = {
      // username: POSTGRES_USER,
      // host: 'localhost',
      // database: POSTGRES_DB,
      // password: POSTGRES_PASSWORD,
      // port: Number(POSTGRES_PORT),
      // dialect: 'postgres',
      username: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
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
