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
      productImagePrimary,
      productImageExtra,
      gender,
      classification,
      salePrice,
      salePercentage,
    } = createGoodDto;

    const selectedGender = await this.genderRepository.findOne({
      where: { gender },
    });

    const selectedClassification =
      await this.goodsClassificationsRepository.findOne({
        where: { type: classification },
      });

    const goods = new Goods();
    goods.name = name;
    goods.price = price;
    goods.productImagePrimary = productImagePrimary;
    goods.productImageExtra = productImageExtra;
    goods.gender = selectedGender;
    goods.classification = selectedClassification;

    if (salePrice && salePercentage) {
      goods.salePrice = salePrice;
      goods.salePercentage = salePercentage;
    }

    return this.goodsRepository.save(goods);
  }

  async findAllGoods(goodsFilters: GoodsFiltersDto) {
    const offset = goodsFilters.offset || 0;
    const count = goodsFilters.count || 20;

    const queryOptions = {
      // color: null,
      // size: null,
      gender: null,
      classification: null,
      goodsItems: {
        color: null,
        size: null,
      },
    };

    if (goodsFilters.colorCode) {
      const colorCodes = goodsFilters.colorCode.map((code) => {
        return { colorCode: code };
      });

      const color = await this.colorRepository.find({
        where: colorCodes,
      });

      if (!color) {
        throw new NotAcceptableException('Unacceptable color code');
      }

      queryOptions.goodsItems.color = color;
    }

    if (goodsFilters.size) {
      const sizeIds = goodsFilters.size.map((size) => {
        return { id: size };
      });

      const size = await this.sizeRepository.find({
        where: sizeIds,
      });

      if (!size) {
        throw new NotAcceptableException('Unacceptable size');
      }
      queryOptions.goodsItems.size = size;
    }

    if (goodsFilters.gender) {
      const genders = goodsFilters.gender.map((gender) => {
        return { gender };
      });

      const gender = await this.genderRepository.find({
        where: genders,
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
      // relations: ['color', 'gender', 'size', 'classification'],
      relations: [
        'gender',
        'classification',
        'goodsItems.color',
        'goodsItems.size',
      ],
      take: count,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    return {
      data: result,
      meta: {
        requestedCount: count,
        offset,
        responseCount: result.length,
      },
    };
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

  async findGoodsDetail() {
    // find goods detail
    //join with goods-items
  }

  async findOne(id: number) {
    return this.goodsRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateGoodDto: UpdateGoodsDto) {
    return `This action updates a #${id} good`;
  }

  remove(id: number) {
    return `This action removes a #${id} good`;
  }
}
