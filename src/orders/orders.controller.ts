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

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
