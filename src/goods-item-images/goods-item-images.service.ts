import { Injectable } from '@nestjs/common';
import { CreateGoodsItemImageDto } from './dto/create-goods-item-image.dto';
import { UpdateGoodsItemImageDto } from './dto/update-goods-item-image.dto';

@Injectable()
export class GoodsItemImagesService {
  create(createGoodsItemImageDto: CreateGoodsItemImageDto) {
    return 'This action adds a new goodsItemImage';
  }

  findAll() {
    return `This action returns all goodsItemImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goodsItemImage`;
  }

  update(id: number, updateGoodsItemImageDto: UpdateGoodsItemImageDto) {
    return `This action updates a #${id} goodsItemImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} goodsItemImage`;
  }
}
