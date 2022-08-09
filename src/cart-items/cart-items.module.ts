import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from './entities/cart-item.entity';
import { CartsModule } from 'src/carts/carts.module';
import { GoodsModule } from 'src/goods/goods.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItems]),
    CartsModule,
    GoodsModule,
    AuthModule,
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
