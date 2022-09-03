import { Module } from '@nestjs/common';
import { AnonymousCartService } from './anonymous-cart.service';
import { AnonymousCartController } from './anonymous-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from 'src/cart-items/entities/cart-item.entity';
import { AnonymousCart } from './entities/anonymous-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnonymousCart, CartItems])],
  controllers: [AnonymousCartController],
  providers: [AnonymousCartService],
  exports: [AnonymousCartService],
})
export class AnonymousCartModule {}
