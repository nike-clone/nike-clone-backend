import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsItemImagesService } from 'src/goods-item-images/goods-item-images.service';
import { Color } from 'src/goods/entities/colors.entity';
import { Size } from 'src/goods/entities/sizes.entity';
import { GoodsService } from 'src/goods/goods.service';
import { Repository } from 'typeorm';
import { CreateGoodsItemDto } from './dto/create-goods-item.dto';
import { GoodsItem } from './entities/goods-item.entity';

@Injectable()
export class GoodsItemsService {
  constructor(
    @InjectRepository(GoodsItem)
    private goodsItemsRepository: Repository<GoodsItem>,
    @InjectRepository(Color) private colorsRepository: Repository<Color>,
    @InjectRepository(Size) private sizesRepository: Repository<Size>,
    private goodsService: GoodsService,
    private goodsItemImagesService: GoodsItemImagesService,
  ) {}

  async create(createGoodsItemDto: CreateGoodsItemDto) {
    const goods = await this.goodsService.findOne(createGoodsItemDto.goodsId);
    if (!goods) {
      throw new NotFoundException('Goods not found.');
    }

    const goodsItemImages = await this.goodsItemImagesService.findOne(
      createGoodsItemDto.goodsItemImagesId,
    );

    const size = await this.sizesRepository.findOne({
      where: { id: createGoodsItemDto.size },
    });

    const color = await this.colorsRepository.findOne({
      where: { name: createGoodsItemDto.color },
    });

    const goodsItem = await this.goodsItemsRepository.create({
      goodsItemImages,
      stock: createGoodsItemDto.stock,
      color,
      size,
      goods,
    });

    return this.goodsItemsRepository.save(goodsItem);
  }
}
