import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from 'src/auth/auth.module';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsService } from 'src/carts/carts.service';
import { CartItems } from '../cart-items/entities/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart, CartItems]),
    EmailModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CartsService],
  exports: [UsersService],
})
export class UsersModule {}
