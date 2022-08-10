import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsItem } from 'src/goods-items/entities/goods-item.entity';
import { GoodsItemsService } from 'src/goods-items/goods-items.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { Repository } from 'typeorm';
import { CreateGoodsItemImageDto } from './dto/create-goods-item-image.dto';
import { UpdateGoodsItemImageDto } from './dto/update-goods-item-image.dto';
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
    });

    return this.goodsItemImagesRepository.save(images);
  }

  findAll() {
    return `This action returns all goodsItemImages`;
  }

  findOne(id: number) {
    return this.goodsItemImagesRepository.findOne({ where: { id } });
  }

  update(id: number, updateGoodsItemImageDto: UpdateGoodsItemImageDto) {
    return `This action updates a #${id} goodsItemImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} goodsItemImage`;
  }
}
