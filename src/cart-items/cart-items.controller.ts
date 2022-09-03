import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CartGuard } from 'src/guards/cart.guard';
import { User } from '../users/entities/user.entity';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @UseGuards(CartGuard)
  @Post()
  create(
    @Body() createCartItemDto: CreateCartItemDto,
    @Query('anonymous_id') anonymous_id: string,
    @CurrentUser() user: User,
  ) {
    return this.cartItemsService.createCartItem(
      createCartItemDto,
      user,
      anonymous_id,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.cartItemsService.findAllCartItems(user);
  }

  @UseGuards(AuthGuard)
  @Patch(':cartItemId')
  update(
    @Param('cartItemId', ParseIntPipe) id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @CurrentUser() user: User,
  ) {
    return this.cartItemsService.updateCartItem(id, updateCartItemDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.cartItemsService.remove(id, user);
  }
}
