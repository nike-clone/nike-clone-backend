import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { QueryRequired } from 'src/decorators/query-required.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/users/entities/user.entity';
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
    return this.cartsService.findCartByUserId(user.id);
  }

  @UseGuards(AuthGuard)
  @Post('/clear')
  clearCart(@CurrentUser() user: User) {
    return this.cartsService.clearCart(user);
  }
}
