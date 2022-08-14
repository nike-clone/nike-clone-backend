import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GoodsItemsService } from './goods-items.service';
import { CreateGoodsItemDto } from './dto/create-goods-item.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('goods-items')
export class GoodsItemsController {
  constructor(private readonly goodsItemsService: GoodsItemsService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createGoodsItemDto: CreateGoodsItemDto) {
    return this.goodsItemsService.create(createGoodsItemDto);
  }
}
