import * as dotenv from 'dotenv';

export const envFilePath = `${__dirname}/config/env/.${process.env.NODE_ENV}.env`;

dotenv.config({ path: envFilePath });
import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
} as DataSourceOptions);
