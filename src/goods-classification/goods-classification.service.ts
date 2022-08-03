import { Injectable } from '@nestjs/common';
import { CreateGoodsClassificationDto } from './dto/create-goods-classification.dto';
import { UpdateGoodsClassificationDto } from './dto/update-goods-classification.dto';

@Injectable()
export class GoodsClassificationService {
  create(createGoodsClassificationDto: CreateGoodsClassificationDto) {
    return 'This action adds a new goodsClassification';
  }

  findAll() {
    return `This action returns all goodsClassification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goodsClassification`;
  }

  update(id: number, updateGoodsClassificationDto: UpdateGoodsClassificationDto) {
    return `This action updates a #${id} goodsClassification`;
  }

  remove(id: number) {
    return `This action removes a #${id} goodsClassification`;
  }
}
