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
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@CurrentUser() user: any) {
    return this.cartsService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findCartByUserId(@CurrentUser() user: any) {
    return this.cartsService.findCartByUserId(user.userId);
  }

  @UseGuards(AuthGuard)
  @Post('/clear')
  clearCart(@CurrentUser() user: any) {
    return this.cartsService.clearCart(user);
  }

  // @UseGuards(AuthGuard)
  // @Patch()
  // updateCartByUserToken(
  //   @Body() updateCartDto: UpdateCartDto,
  //   @CurrentUser() user: any,
  // ) {
  //   return this.cartsService.updateCartByUserToken(updateCartDto, user);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartsService.update(+id, updateCartDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
