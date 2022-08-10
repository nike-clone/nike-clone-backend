import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoodsItemImagesService } from './goods-item-images.service';
import { CreateGoodsItemImageDto } from './dto/create-goods-item-image.dto';
import { UpdateGoodsItemImageDto } from './dto/update-goods-item-image.dto';

@Controller('goods-item-images')
export class GoodsItemImagesController {
  constructor(
    private readonly goodsItemImagesService: GoodsItemImagesService,
  ) {}

  @Post()
  create(@Body() createGoodsItemImageDto: CreateGoodsItemImageDto) {
    return this.goodsItemImagesService.create(createGoodsItemImageDto);
  }

  @Get()
  findAll() {
    return this.goodsItemImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsItemImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoodsItemImageDto: UpdateGoodsItemImageDto,
  ) {
    return this.goodsItemImagesService.update(+id, updateGoodsItemImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsItemImagesService.remove(+id);
  }
}
