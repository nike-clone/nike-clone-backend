import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from './entities/cart-item.entity';
import { CartsModule } from 'src/carts/carts.module';
import { GoodsModule } from 'src/goods/goods.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { GoodsItemsModule } from 'src/goods-items/goods-items.module';
import { Cart } from 'src/carts/entities/cart.entity';
import { AnonymousCart } from 'src/anonymous-cart/entities/anonymous-cart.entity';
import { AnonymousCartModule } from 'src/anonymous-cart/anonymous-cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItems, Cart, AnonymousCart]),
    CartsModule,
    GoodsModule,
    AuthModule,
    UsersModule,
    GoodsItemsModule,
    AnonymousCartModule,
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
