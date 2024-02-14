import { join } from 'path'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const entity = join(__dirname, 'entities', '*.entity.ts')
const migration = join(__dirname, 'migrations', '*.ts')

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: +(process.env.DATABASE_PORT ?? 3306),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'root',
  database: process.env.DATABASE_DATABASE ?? 'teste-db',
  entities: [entity],
  migrations: [migration],
  synchronize: false,
}

export const dataSource = new DataSource({
  ...options,
  namingStrategy: new SnakeNamingStrategy(),
})
