import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoodsItemImageDto } from './dto/create-goods-item-image.dto';
import { GoodsItemImages } from './entities/goods-item-image.entity';

@Injectable()
export class GoodsItemImagesService {
  constructor(
    @InjectRepository(GoodsItemImages)
    private goodsItemImagesRepository: Repository<GoodsItemImages>,
  ) {}

  async create(createGoodsItemImageDto: CreateGoodsItemImageDto) {
    const images = await this.goodsItemImagesRepository.create({
      goodsItemImages: createGoodsItemImageDto.goodsItemImages,
      goodsName: createGoodsItemImageDto.goodsName,
      color: createGoodsItemImageDto.color,
    });

    return this.goodsItemImagesRepository.save(images);
  }

  async findOne(id: number) {
    return this.goodsItemImagesRepository.findOne({ where: { id } });
  }
}
