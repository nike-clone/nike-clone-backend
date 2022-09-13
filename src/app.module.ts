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

import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';

import { resolve } from 'path';

import { GoodsClassificationModule } from './goods-classification/goods-classification.module';
import { GoodsItemsModule } from './goods-items/goods-items.module';
import { GoodsItemImagesModule } from './goods-item-images/goods-item-images.module';
import { AnonymousCartModule } from './anonymous-cart/anonymous-cart.module';
import { OrdersModule } from './orders/orders.module';

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
    GoodsItemsModule,
    GoodsItemImagesModule,
    AnonymousCartModule,
    OrdersModule,
  ],
})
export class AppModule {}
