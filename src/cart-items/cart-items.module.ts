import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from './entities/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItems])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
