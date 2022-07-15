import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import OrmConfig from './ormConfig';

console.log(OrmConfig);
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(OrmConfig as TypeOrmModuleOptions),
    // TypeOrmModule.forRoot({
    //   type: process.env.DATABASE_TYPE,
    //   host: process.env.DATABASE_HOST,
    //   port: +process.env.DATABASE_PORT,
    //   username: process.env.DATABASE_USERNAME,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,

    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // } as AuroraDataApiConnectionOptions),
    ApiModule,
  ],
})
export class AppModule {}
