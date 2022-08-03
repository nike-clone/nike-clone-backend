import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoodsClassificationDto } from './dto/create-goods-classification.dto';
import { GoodsClassification } from './entities/goods-classification.entity';

@Injectable()
export class GoodsClassificationService {
  constructor(
    @InjectRepository(GoodsClassification)
    private classificationsRepository: Repository<GoodsClassification>,
  ) {}

  async create(createGoodsClassificationDto: CreateGoodsClassificationDto) {
    const classification = this.classificationsRepository.create({
      type: createGoodsClassificationDto.type,
      alias: createGoodsClassificationDto.alias,
    });

    await this.classificationsRepository.save(classification);

    return this.classificationsRepository.find();
  }

  findAll() {
    return this.classificationsRepository.find();
  }

  async remove(id: number) {
    await this.classificationsRepository.delete(id);

    return this.classificationsRepository.find();
  }
}
