import { Controller, Post, Body } from '@nestjs/common';
import { GoodsItemImagesService } from './goods-item-images.service';
import { CreateGoodsItemImageDto } from './dto/create-goods-item-image.dto';

@Controller('goods-item-images')
export class GoodsItemImagesController {
  constructor(
    private readonly goodsItemImagesService: GoodsItemImagesService,
  ) {}

  @Post()
  create(@Body() createGoodsItemImageDto: CreateGoodsItemImageDto) {
    return this.goodsItemImagesService.create(createGoodsItemImageDto);
  }
}
