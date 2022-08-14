import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../users/entities/user.entity';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@CurrentUser() user: User) {
    return this.cartsService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findCartByUserId(@CurrentUser() user: User) {
    return this.cartsService.findOne(user);
  }

  @UseGuards(AuthGuard)
  @Post('/clear')
  clearCart(@CurrentUser() user: User) {
    return this.cartsService.clearCart(user);
  }
}
