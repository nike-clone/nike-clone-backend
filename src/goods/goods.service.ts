import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsClassification } from 'src/goods-classification/entities/goods-classification.entity';
import { Repository } from 'typeorm';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { GoodsFiltersDto } from './dto/goods-filters.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Color } from './entities/colors.entity';
import { Gender } from './entities/genders.entity';
import { Goods } from './entities/goods.entity';
import { Size } from './entities/sizes.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods) private goodsRepository: Repository<Goods>,
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
    @InjectRepository(GoodsClassification)
    private goodsClassificationsRepository: Repository<GoodsClassification>,
  ) {}

  async create(createGoodDto: CreateGoodsDto) {
    const {
      name,
      price,
      imagePath,
      gender,
      color,
      size,
      stock,
      classification,
    } = createGoodDto;

    const selectedColor = await this.colorRepository.findOne({
      where: { name: color },
    });
    const selectedGender = await this.genderRepository.findOne({
      where: { gender },
    });
    const selectedSize = await this.sizeRepository.findOne({
      where: { id: size },
    });
    const selectedClassification =
      await this.goodsClassificationsRepository.findOne({
        where: { type: classification },
      });

    const goods = new Goods();
    goods.name = name;
    goods.price = price;
    goods.imagePath = imagePath;
    goods.color = selectedColor;
    goods.gender = selectedGender;
    goods.size = selectedSize;
    goods.stock = stock;
    goods.classification = selectedClassification;

    return this.goodsRepository.save(goods);
  }

  async findAllGoods(goodsFilters: GoodsFiltersDto) {
    const queryOptions = {
      color: null,
      size: null,
      gender: null,
      classification: null,
    };

    if (goodsFilters.colorCode) {
      const color = await this.colorRepository.findOne({
        where: { colorCode: goodsFilters.colorCode },
      });
      if (!color) {
        throw new NotAcceptableException('Unacceptable color code');
      }
      queryOptions.color = color;
    }

    if (goodsFilters.size) {
      const size = await this.sizeRepository.findOne({
        where: { id: goodsFilters.size },
      });
      if (!size) {
        throw new NotAcceptableException('Unacceptable size');
      }
      queryOptions.size = size;
    }

    if (goodsFilters.gender) {
      const gender = await this.genderRepository.findOne({
        where: { gender: goodsFilters.gender },
      });
      if (!gender) {
        throw new NotAcceptableException('Unacceptable gender');
      }
      queryOptions.gender = gender;
    }

    if (goodsFilters.classification) {
      const classification = await this.goodsClassificationsRepository.findOne({
        where: { alias: goodsFilters.classification },
      });
      if (!classification) {
        throw new NotAcceptableException('Unacceptable classification (alias)');
      }
      queryOptions.classification = classification;
    }

    const result = await this.goodsRepository.find({
      where: { ...queryOptions },
      relations: ['color', 'gender', 'size', 'classification'],
    });

    return result;
  }

  async findAllSizes() {
    const result = await this.sizeRepository.find();
    const sizes = [];
    for (const el of result) {
      sizes.push(el.id);
    }
    return sizes;
  }

  async findAllColors() {
    return await this.colorRepository.find();
  }

  async findAllGenders() {
    return await this.genderRepository.find();
  }

  findOne(id: number) {
    return this.goodsRepository.findOne({
      where: { id },
      relations: ['color', 'gender', 'size', 'classification'],
    });
  }

  update(id: number, updateGoodDto: UpdateGoodsDto) {
    return `This action updates a #${id} good`;
  }

  remove(id: number) {
    return `This action removes a #${id} good`;
  }
}
