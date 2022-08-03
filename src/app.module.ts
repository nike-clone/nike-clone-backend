import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import OrmConfig from './ormConfig';

import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { ServeStaticOptions } from '@nestjs/platform-express/interfaces/serve-static-options.interface';
import { BannersModule } from './banners/banners.module';
import { GoodsModule } from './goods/goods.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { GoodsClassificationModule } from './goods-classification/goods-classification.module';

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
    AuthModule,
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('./static/views');
        const servePath = 'views';

        return {
          rootPath: publicDir,
          serveRoot: '/page',
          // renderPath: '/page',
          exclude: ['/api*'],
        } as ServeStaticModuleOptions;
      })(),
    ),
    CartsModule,
    CartItemsModule,
    GoodsClassificationModule,
  ],
})
export class AppModule {}
