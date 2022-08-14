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
  ParseIntPipe,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GoodsFiltersDto } from './dto/goods-filters.dto';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get('/test')
  test(@Query() query: any) {
    return query;
  }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createGoodDto: CreateGoodsDto) {
    return this.goodsService.create(createGoodDto);
  }

  @Get()
  findAll(@Query() goodsFilters: GoodsFiltersDto) {
    return this.goodsService.findAllGoods(goodsFilters);
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
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() goodsFilters: GoodsFiltersDto,
  ) {
    return this.goodsService.findGoodsDetail(id, goodsFilters);
    // return this.goodsService.findOne(+id);
  }
}
