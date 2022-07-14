import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

const envFilePath = `${__dirname}/config/env/.${process.env.NODE_ENV}.env`;
dotenv.config({ path: envFilePath });

export class OrmConfig {
  getConfig() {
    let ormConfig: TypeOrmModuleOptions;
    switch (process.env.NODE_ENV) {
      case 'development': {
        ormConfig = {
          type: process.env.DATABASE_TYPE,
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          enities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleOptions;
        break;
      }
      case 'production': {
        ormConfig = {
          type: process.env.DATABASE_TYPE,
          host: process.env.DATABASE_HOST,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [process.env.DATABASE_ENTITIES],
        } as TypeOrmModuleOptions;
        break;
      }
    }

    return ormConfig;
  }
}

export default new OrmConfig().getConfig();
