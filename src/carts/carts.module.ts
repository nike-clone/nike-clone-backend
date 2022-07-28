import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [TypeOrmModule.forFeature([Cart, User])],
})
export class CartsModule {}