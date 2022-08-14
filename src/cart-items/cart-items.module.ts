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

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItems, Cart]),
    CartsModule,
    GoodsModule,
    AuthModule,
    UsersModule,
    GoodsItemsModule,
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
