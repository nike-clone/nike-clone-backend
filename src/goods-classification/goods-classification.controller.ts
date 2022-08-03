import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoodsClassificationService } from './goods-classification.service';
import { CreateGoodsClassificationDto } from './dto/create-goods-classification.dto';
import { UpdateGoodsClassificationDto } from './dto/update-goods-classification.dto';

@Controller('goods-classification')
export class GoodsClassificationController {
  constructor(
    private readonly goodsClassificationService: GoodsClassificationService,
  ) {}

  @Post()
  create(@Body() createGoodsClassificationDto: CreateGoodsClassificationDto) {
    return this.goodsClassificationService.create(createGoodsClassificationDto);
  }

  @Get()
  findAll() {
    return this.goodsClassificationService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsClassificationService.remove(+id);
  }
}
