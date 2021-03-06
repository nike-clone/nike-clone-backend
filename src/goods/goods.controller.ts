import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createGoodDto: CreateGoodsDto) {
    return this.goodsService.create(createGoodDto);
  }

  @Get()
  findAll() {
    return this.goodsService.findAllGoods();
  }

  @Get('/sizes')
  getAllSizes() {
    return this.goodsService.findAllSizes();
  }

  @Get('/colors')
  getAllColors() {
    return this.goodsService.findAllColors();
  }

  @Get('/genders')
  getAllGenders() {
    return this.goodsService.findAllGenders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodsDto) {
    return this.goodsService.update(+id, updateGoodDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(+id);
  }
}
