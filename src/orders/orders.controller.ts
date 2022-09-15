import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, CreateOrderResponseDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartGuard } from 'src/guards/cart.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Orders } from './entities/orders.entity';
import { FindOrderResponseDto } from './dto/find-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(CartGuard)
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Query('anonymous_id') anonymous_id: string,
    @CurrentUser() user: User,
  ): Promise<CreateOrderResponseDto> {
    return this.ordersService.create(createOrderDto, user, anonymous_id);
  }

  @UseGuards(CartGuard)
  @Get()
  findAll(
    @Query('anonymous_id') anonymous_id: string,
    @CurrentUser() user: User,
  ): Promise<FindOrderResponseDto[]> {
    return this.ordersService.findAll(user, anonymous_id);
  }

  //TODO: 주문 취소
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
